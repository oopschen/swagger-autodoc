import walk from 'walk';
import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import static_router from 'koa-static';

const convertFile2ApiUrl = api => ({
  name: api.replace(/(.*(\/.*)?)\.(yml|yaml|json)$/ig, '$1').replace(/\//ig, '-'),
  url: '/' + api
});


const walkDir = async (sourceDir, callback) => {
  let docs = [], walkOpt = {
    listeners: {
      file: (root, fileStats, next) => {
        if (/.*\.(yml|yaml|json)$/ig.test(fileStats.name)) {
          let relativePath = path.relative(
            sourceDir, path.join(root, fileStats.name)
          );
          docs.push(convertFile2ApiUrl(relativePath));
        }
        next();
      }
    }
  };
  walk.walkSync(sourceDir, walkOpt);

  if (!callback) {
    return;
  }

  docs = 1 > docs.length ? [{name: "petstore", url: "https://petstore.swagger.io/v2/swagger.json"}] : docs
  await callback(docs);
};
// end


// start server
const app = new Koa();
const router = new Router();

let base_doc = process.env.DOC_BASE ? path.normalize(process.env.DOC_BASE) : path.join(__dirname, '..', 'api-doc'),
    base_static = process.env.WEB_BASE ? path.normalize(process.env.WEB_BASE) : path.join(__dirname, '..', 'dist', 'swagger')
  ;

router.get('/api-doc-meta', async (ctx, next) => {
  await walkDir(base_doc, async (files) => {
    ctx.status = 200;
    ctx.body = JSON.stringify(files);
    await next();
  });

});

app.use(router.routes())
  .use(router.allowedMethods());

// static
app.use(static_router(base_static));
app.use(static_router(base_doc));
app.listen(8082);
