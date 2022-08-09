import inquirer from "inquirer";
import { execaCommand } from "execa";
import projects from "./config/project/index.js";
import { magentaBright, greenBright, bold } from "colorette";

inquirer
  .prompt([
    {
      type: "list",
      message: `选择要启动的项目：`,
      name: "mono",    // 存储答案的字段
      default: projects[0].enName,   // 默认启动项
      choices: projects.map((p) => {   // 选择
        return { name: p.cnName, value: p.enName };
      }),
    }
  ])
  .then(({mono: prd}) => {
    const project = projects.find((v) => v.enName == prd);
    console.log(`>>> 当前项目标识：当前产品标识：${bold(magentaBright(project.enName))}`);

    const cmd = `pnpm --F @projects/${project.enName} run dev `;

    let envVars = {
      selectedProject: project.enName,
      product: prd,
      // project: project.projectKey,
      // isLocal,
    };

    execaCommand(cmd, { stdio: "inherit", env: envVars });

  }).catch((err) => {
    console.log("error", err)
  });