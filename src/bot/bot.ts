import * as colors from 'colors';
import { CommandoClient } from 'discord.js-commando';
import { join } from 'path';
import 'typescript';
import './lib/env';
import { successfulCommandExec, unsuccessfulCommandExec } from './listeners/commandExecution';
import { commandRegister } from './listeners/commandRegistration';
import { messageHandling } from './listeners/messageHandling';

colors.setTheme({
    debug: 'cyan',
    error: 'red',
    success: 'green',
    warn: 'yellow'
});

const prefix = process.env.PREFIX ?? 'st!';
export const client = new CommandoClient({
    commandPrefix: prefix,
    invite: 'https://discord.gg/SbfA2Sf',
    owner: '264662751404621825'
});

client
    .on('error', console.error)
    .on('warn', console.warn)
    .once('ready', () => {
        console.log(`Logged in as ${client.user?.tag}! (${client.user?.id})`.green);
        console.log(`Prefix is set to: ${prefix}`.cyan);
    })
    .on('message', messageHandling)
    .on('commandRun', successfulCommandExec)
    .on('commandError', unsuccessfulCommandExec)
    .on('commandRegister', commandRegister)
    .registry
        .registerDefaultTypes()
        .registerGroups([
            ['misc', 'Miscellaneous commands that don\'t fit in other groups.'],
            ['information', 'Commands that provide useful information to the user.'],
            ['admin', 'Commands to help administration give out information and perform their tasks more easily.'],
            // ['fivem', 'Commands that are related to FiveM.']
        ])
        .registerDefaultGroups()
        .registerDefaultCommands({
            help: false
        })
        .registerCommandsIn(join(__dirname, 'commands'));

client.login(process.env.BOT_TOKEN);