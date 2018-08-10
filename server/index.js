import walk from 'walk';
import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import static_router from 'koa-static';


const convertFile2ApiUrl = api => {
  let name = api.replace(/\//ig, '-').replace(/\..+$/ig, '');
  let url = '/' + api;
  return {name, url};
};


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
  await callback(docs);
};
// end


// start server
const app = new Koa();
const router = new Router();

router.get('/api-doc-meta', async (ctx, next) => {
  await walkDir(path.join(__dirname, '..', 'api-doc'), async (files) => {
    ctx.status = 200;
    ctx.body = JSON.stringify(files);
    await next();
  });

});

app.use(router.routes())
  .use(router.allowedMethods());

// static
app.use(static_router(path.join(__dirname, '..', 'dist', 'swagger')));
app.use(static_router(path.join(__dirname, '..', 'api-doc')));
app.listen(8080);
