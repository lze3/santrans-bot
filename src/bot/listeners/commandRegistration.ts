import { Command, CommandoRegistry } from 'discord.js-commando';
import { stripIndents } from 'common-tags';

/**
 * Handles any command registered.
 *
 * @param command Command object of registered command.
 * @param registry Registry used.
 */
export const commandRegister = (command: Command, registry: CommandoRegistry) => {
    console.log(stripIndents`[CMD REGISTER]
        Name: ${command.name}
        Group: ${command.group.id}
        Member Name: ${command.memberName}
        NSFW?: ${command.nsfw ? 'Yes' : 'No'}
        Guild only?: ${command.guildOnly ? 'Yes' : 'No'}\n`.green);
};