import { Command, CommandoRegistry } from 'discord.js-commando';
import { callbackify } from 'util';

/**
 * Handles any command registered.
 *
 * @param command Command object of registered command.
 * @param registry Registry used.
 */
// tslint:disable-next-line:typedef
export const commandRegister = (command: Command, registry: CommandoRegistry) => {
    console.log('[CMD REGISTER] \n'.green +
        'Name: %s\n'.green +
        'Group: %s\n'.green +
        'Member Name: %s\n'.green +
        'NSFW?: %s\n'.green +
        'Guild only?: %s\n'.green, command.name, command.group.id, command.memberName, command.nsfw ? 'Yes' : 'No', command.guildOnly ? 'Yes' : 'No');
};