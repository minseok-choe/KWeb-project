const express = require("express");
const router = require("./router");

const port = 3000;
const app = express();

//app.use("/", router); // '/'를 넣어줌으로 path로 들어온 것에 대해서 이 미들웨어를 실행하겠다 라는 뜻 만약
//app.use("/path", router); //이렇게 하면 path 내에 바인딩된 라우터이기 때문에 그 때 실행

app.use(router);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
