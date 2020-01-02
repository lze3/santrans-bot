import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { MessageEmbed, Message, GuildChannel, TextChannel } from 'discord.js';
const st_url = 'https://i.imgur.com/Q4Uibii.png';

export default class Poll extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'poll',
            group: 'admin',
            memberName: 'poll',
            description: 'Begins a poll.',
            userPermissions: ['ADMINISTRATOR'],
            clientPermissions: ['EMBED_LINKS'],
            guildOnly: true,
            hidden: true,
            args: [
                {
                    key: 'question',
                    prompt: 'What question would you like to get feedback for?',
                    type: 'string'
                }
            ]
        });
    }

    public run(message: CommandoMessage, { question }: { question: string }) {
        message.delete();

        const embed = new MessageEmbed()
            .setTitle('A poll has started, please vote!')
            .setDescription(question)
            .setColor('#FFC600')
            .setFooter(`Started by ${message.author.username} • ${message.member.roles.hoist?.name}`, st_url)
            .setTimestamp();

        message.say(embed)
            .then(async (msg: Message|Message[]) => {
                if (msg instanceof Message) {
                    await msg.react('527692448353222682');
                    await msg.react('527692468322566154');
                }
            })
            .catch(e => {
                console.log(e.stack);
                return message.reply('something went wrong, sorry!');
            });

        return null;
    }
}