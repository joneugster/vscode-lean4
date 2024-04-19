import { OutputChannel } from 'vscode'
import { ExecutionExitCode, ExecutionResult, batchExecute } from './batch'
import { FileUri } from './exturi'

export class SetupDiagnoser {
    channel: OutputChannel
    cwdUri: FileUri | undefined

    constructor(channel: OutputChannel, cwdUri: FileUri | undefined) {
        this.channel = channel
        this.cwdUri = cwdUri
    }

    async checkLakeAndDepsAvailable(): Promise<'Success' | 'LakeUnavailable' | 'GitUnavailable'> {
        if (!(await this.checkLakeAvailable())) {
            return 'LakeUnavailable'
        }
        if (!(await this.checkGitAvailable())) {
            return 'GitUnavailable'
        }
        return 'Success'
    }

    async checkLakeAvailable(): Promise<boolean> {
        const lakeVersionResult = await this.runSilently('lake', ['--version'])
        return lakeVersionResult.exitCode === ExecutionExitCode.Success
    }

    async checkGitAvailable(): Promise<boolean> {
        const gitVersionResult = await batchExecute('git', ['--version'])
        return gitVersionResult.exitCode === ExecutionExitCode.Success
    }

    private async runSilently(executablePath: string, args: string[]): Promise<ExecutionResult> {
        return batchExecute(executablePath, args, this.cwdUri?.fsPath, { combined: this.channel })
    }
}

export function diagnose(channel: OutputChannel, cwdUri: FileUri | undefined): SetupDiagnoser {
    return new SetupDiagnoser(channel, cwdUri)
}
