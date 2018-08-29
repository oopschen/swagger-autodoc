# swagger-autodoc
A swagger dockument reader site. 

## Features

1. Automatically search for documents in directory **/var/lib/swagger-autodoc/apis**.
2. Use Swagger UI for page rendering.

# Develop web

```
npm run start
```

# Build
## Build web

```
npm run release
```

## Build server

```
npm run release-server
```

# Docker Usage

```
docker run --namne autodoc -p 8080:8080 -v $(pwd):/var/lib/swagger-autodoc/apis
```


# Environment

<table>
  <tr>
    <th>Variable</th>
    <th>Details</th>
  </tr>
  <tr>
    <td>DOC_BASE</td>
    <td>document absolute path, default to /var/lib/swagger-autodoc/api-doc</td>
  </tr>
  <tr>
    <td>WEB_BASE</td>
    <td>web site absolute path, default to /var/lib/swagger-autodoc/dist/swagger</td>
  </tr>
</table>
