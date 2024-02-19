const fs = require("fs");

const clean = () => {
  fs.rmSync("./node_modules", { recursive: true, force: true });
  fs.rmSync("./dist", { recursive: true, force: true });
  //fs.rmSync("./venv", { recursvie: true, force: true  });

  fs.rmSync("./db/node_modules", { recursive: true, force: true });
  fs.rmSync("./db/package-lock.json", { recursive: true, force: true });

  fs.rmSync("./frontend/build", { recursive: true, force: true });
  fs.rmSync("./frontend/node_modules", { recursive: true, force: true });
  fs.rmSync("./frontend/coverage", { recursive: true, force: true });
  //fs.rmSync("./frontend/package-lock.json", { recursive: true, force: true });

  fs.rmSync("./backend/.pytest_cache/", { recursive: true, force: true });
  fs.rmSync("./backend/.coverage", { recursive: true, force: true });
};

clean();
