import { exec } from 'child_process'; //from Node.js

describe('CLI Tests', () => {
    it('should start a task', async () => {
        const result = await runCLICommand('start "Test Task"');
        expect(result).toContain('Started task "Test Task"');
    });

    it('should stop a task', async () => {
        await runCLICommand('start "Test Task"');
        const result = await runCLICommand('stop "Test Task"');
        expect(result).toContain('Stopped task "Test Task"');
    });


    it('should generate a report', async () => {
        await runCLICommand('start "Test Task"');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await runCLICommand('stop "Test Task"');
        const result = await runCLICommand('report');
        expect(result).toMatch(/Task: Test Task, Start: .* End: .* Duration: .* seconds/);
    }, 10000);
});

async function runCLICommand(command: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        exec(`npx ts-node src/index.ts ${command}`, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}
