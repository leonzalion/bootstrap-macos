import type { SyncOptions } from 'execa';
import { execaCommandSync, execaSync } from 'execa';

type RunCommandProps = {
	/**
	 * The link where the install command can be found.
	 */
	installLink?: string;

	/**
	 * A brief description about what the command does.
	 */
	description?: string;

	/**
	 * The installation command to run
	 */
	command: string | string[];
} & SyncOptions;

export function runCommand(props: RunCommandProps) {
	const { installLink, command, description, ...execaOptions } = props;
	console.info(description, installLink);
	if (typeof command === 'string') {
		return execaCommandSync(command, execaOptions);
	} else {
		if (command[0] === undefined) {
			throw new Error('At least one command must be specified.');
		}

		return execaSync(command[0], command.slice(1), execaOptions);
	}
}