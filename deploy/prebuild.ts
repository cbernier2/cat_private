import * as childProcess from 'child_process';
import * as fs from 'fs';

const rootDir = `${__dirname}/..`;

const execPListBuddy = (command: string) =>
  new Promise<string>((resolve, reject) => {
    childProcess.exec(
      `/usr/libexec/PlistBuddy ${rootDir}/ios/pit_supervisor/Info.plist -c "${command}"`,
      (error, stdout) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout.trim());
        }
      },
    );
  });

const updateUtf8File = (
  filePath: string,
  performUpdate: (utf8Data: string) => string,
) => {
  let utf8Data = fs.readFileSync(filePath, 'utf8');
  utf8Data = performUpdate(utf8Data);
  fs.writeFileSync(filePath, utf8Data);
};

const updateBuildNumbers = async () => {
  if (process.env.BUILD_BUILDID) {
    // iOS
    const versionString = await execPListBuddy(
      'Print CFBundleShortVersionString',
    );
    const baseVersion = versionString.match(/^(\d+\.\d+)/)?.[1];
    console.log(
      `Mobile app version: ${baseVersion}.${process.env.BUILD_BUILDID}`,
    );
    await execPListBuddy(
      `Set CFBundleShortVersionString ${baseVersion}.${process.env.BUILD_BUILDID}`,
    );
    await execPListBuddy(`Set CFBundleVersion ${process.env.BUILD_BUILDID}`);
    // Android
    updateUtf8File(`${rootDir}/android/app/build.gradle`, utf8Data =>
      utf8Data.replace(
        /buildId\s+=\s+[^\s]+/,
        `buildId = ${process.env.BUILD_BUILDID}`,
      ),
    );
  }
};

const updatePackageJsonVersion = () => {
  if (process.env.BUILD_BUILDID) {
    const packageJsonFilepath = `${rootDir}/package.json`;
    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonFilepath, 'utf8'),
    );
    const baseVersion = packageJson.version.match(/^(\d+\.\d+)/)[1];
    packageJson.version = `${baseVersion}.${process.env.BUILD_BUILDID}`;
    console.log(`packageJson.version: ${packageJson.version}`);
    fs.writeFileSync(packageJsonFilepath, JSON.stringify(packageJson, null, 4));
  }
};

const main = async () => {
  try {
    await updateBuildNumbers();
    updatePackageJsonVersion();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

main().then();
