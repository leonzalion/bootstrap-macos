import { createBootstrapper } from '~/utils/bootstrapper.js';

export const vscodeBootstrapper = createBootstrapper({
	name: 'VSCode',
	todo: true,
	bootstrap() {
		// todo: set up useful VSCode extensions and settings and shortcuts and vsce
	},
});

export default vscodeBootstrapper;
