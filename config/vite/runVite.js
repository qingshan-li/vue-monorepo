import { execaCommand } from "execa";

/**
 * 按照项目名称启动项目
 * @param projectName 项目名称
*/
export default function runVite(projectName) {
  let cmd = `vite --config ../../../config/vite/vite.config.ts --host`;

  execaCommand(cmd, { stdio: "inherit" })
}