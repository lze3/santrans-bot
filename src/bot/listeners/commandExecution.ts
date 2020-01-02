import { Command, CommandoMessage, ArgumentCollectorResult } from 'discord.js-commando';

export default function commandExecution(command: Command, promise: Promise<Command>, message: CommandoMessage, args: object | string | string[], fromPattern: boolean, result?: ArgumentCollectorResult) {
    console.log(`[CMD SUCCESS] ${message.author.username}#${message.author.discriminator}: ${command.name} from ${command.group} - ${message.content}`.green);
}