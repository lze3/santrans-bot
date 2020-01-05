import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { MessageEmbed, Message } from 'discord.js';

export default class Announce extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'announce',
            group: 'admin',
            memberName: 'announce',
            description: 'Posts an informative announcement.',
            userPermissions: ['ADMINISTRATOR'],
            clientPermissions: ['EMBED_LINKS'],
            guildOnly: true,
            hidden: true,
            args: [
                {
                    key: 'announcement',
                    prompt: 'What would you like to announce?',
                    type: 'string'
                }
            ]
        });
    }

    public run(message: CommandoMessage, { announcement }: { announcement: string }) {
        message.delete();

        const embed: MessageEmbed = new MessageEmbed()
            .setAuthor(`Department announcement from ${message.author.username}`, message.author.avatarURL() ?? undefined)
            .setDescription(announcement)
            .setColor('#FFC600')
            .setFooter(message.member.roles.hoist?.name ?? 'Staff')
            .setTimestamp();

        const delimiter: string[] = announcement.split(/ +\| +/);
        if (delimiter[0] !== undefined) {
            embed.setTitle(delimiter[0]);
            embed.setDescription(announcement.slice(delimiter[0].length));
        }
        else {
            embed.setDescription(announcement);
        }

        return message.say(embed);
    }
}