import { awscdk, javascript } from "projen";

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.194.0",
  defaultReleaseBranch: "main",
  depsUpgradeOptions: { workflow: false },
  eslint: true,
  minNodeVersion: "22.15.0",
  name: "cdk-aws-cron-function",
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion: "10",
  prettier: true,
  projenrcTs: true,

  deps: [
    "@aws-lambda-powertools/logger",
    "@middy/core",
    "@middy/http-error-handler",
    "@types/aws-lambda",
  ],
});

project.synth();
