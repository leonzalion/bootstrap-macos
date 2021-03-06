import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { outdent } from 'outdent';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';

// TODO: https://gist.github.com/simme/1297707

const tmuxConf = outdent`
  unbind-key C-b
  set -g prefix 'BTab'
  bind-key 'BTab' send-prefix
  set -g mouse on

  set-window-option -g mode-keys vi
  bind-key -T copy-mode-vi v send -X begin-selection
  bind-key -T copy-mode-vi V send -X select-line
  bind-key -T copy-mode-vi y send -X copy-pipe-and-cancel 'xclip -in -selection clipboard'

  bind | split-window -h -c "#{pane_current_path}"
  bind - split-window -v -c "#{pane_current_path}"
  bind c new-window -c "#{pane_current_path}"
  unbind '"'
  unbind %
  unbind -T copy-mode-vi MouseDragEnd1Pane
  set -g history-limit 50000
  set -sg escape-time 0
  bind -n M-k resize-pane -U 5
  bind -n M-j resize-pane -D 5
  bind -n M-h resize-pane -L 5
  bind -n M-l resize-pane -R 5
  set -g default-terminal "xterm-256color"
`;

export const tmuxBootstrapper = createBootstrapper({
	name: 'tmux',
	async bootstrap(context) {
		await brewInstall(context, 'tmux');

		if (!context.dryRun) {
			const tmuxConfPath = path.join(os.homedir(), '.tmux.conf');
			if (!fs.existsSync(tmuxConfPath)) {
				await fs.promises.writeFile(tmuxConfPath, tmuxConf);
			}
		}
	},
});
