import { execaCommand } from "execa";

/**
 * 按照项目名称启动项目
 * @param projectName 项目名称
*/
export default function runVite(projectName) {
  let cmd = `vite --config ./vite.config.ts`

  execaCommand(cmd, { stdio: "inherit" })
}