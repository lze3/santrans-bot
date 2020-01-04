import { Command, CommandoMessage, ArgumentCollectorResult } from 'discord.js-commando';

/**
 * Handles _successful_ command executions.
 *
 * @param command The message object called back.
 * @param promise A promise of a command object.
 * @param message The message that triggered the command.
 * @param args Any arguments provided with command.
 * @param fromPattern Pattern that was used to execute command.
 * @param result Result of command.
 */
export const successfulCommandExec = (command: Command, promise: Promise<Command>, message: CommandoMessage, args: object | string | string[], fromPattern: boolean, result?: ArgumentCollectorResult) => {
    console.log(`[CMD SUCCESS] ${message.author.username}#${message.author.discriminator}: ${command.name} from ${command.group.name} - ${message.content}`.green);
};

/**
 * Handles _unsuccessful_ command executions.
 *
 * @param command The message object called back.
 * @param error The reasoning for failure.
 * @param message The message that triggered the command.
 * @param args Any arguments provided with command.
 * @param fromPattern Pattern that was used to execute command.
 * @param result Result of command.
 */
export const unsuccessfulCommandExec = (command: Command, error: Error, message: CommandoMessage, args: object | string | string[], fromPattern: boolean, result?: ArgumentCollectorResult) => {
    console.log('   Error when handling command execution!'.toUpperCase().red);
    console.log(`Command: ${command.name} (${command.group.name})`);
    console.log(`Message content: ${message.content}`);
    console.log(`Arguments: ${args.toString()}`);
    console.log(`Stacktrace: ${error.stack}`);
};