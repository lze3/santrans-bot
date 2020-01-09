import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { MessageEmbed, TextChannel, GuildChannel, Channel } from 'discord.js';
import { st_url } from '../../util/functions';
import { stripIndents } from 'common-tags';

const report_channel: string = '635129137450975298';
export default class Report extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'report',
            group: 'admin',
            memberName: 'report',
            description: 'Reports a player without them knowing.',
            clientPermissions: ['SEND_MESSAGES'],
            guildOnly: true,
            args: [
                {
                    key: 'name',
                    prompt: 'Who are you reporting? Please include unit number also (e.g. J-4).',
                    type: 'string'
                },
                {
                    key: 'reason',
                    prompt: 'Reason for reporting. **Do not provide evidence yet, this will be requested later.**',
                    type: 'string'
                },
                {
                    key: 'evidence',
                    prompt: 'Please provide any proof you have of the accusations stated.',
                    type: 'string'
                },
                {
                    key: 'additional',
                    prompt: 'If you would like to add any additional information, please state so here. If not, reply with \'no\'.',
                    type: 'string'
                }
            ]
        });
    }

    public run(message: CommandoMessage, { name, reason, evidence, additional }: { name: string, reason: string, evidence: string, additional: string }) {
        message.delete();
        const guild_channel: Channel|undefined = this.client.channels.find(ch => ch.id === report_channel);
        const log_channel: GuildChannel|undefined = message.guild.channels.find(ch => ch.id === '661011416198807602');

        if (!guild_channel) {
            throw Error('Could not find channel in client\'s collection. This is bad!');
        }

        if (message.channel.id !== guild_channel.id) {
            return message.reply(`Not in report channel. (<#${report_channel}>)`);
        }

        console.time('meow');

        const report_embed: MessageEmbed = new MessageEmbed()
            .setAuthor(`Report from ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL() ?? undefined)
            .addField('Offender\'s Name', name)
            .addField('Report reason', reason)
            .addField('Evidence', evidence);

        const replying_embed: MessageEmbed = new MessageEmbed()
            .setAuthor('Report confirmation', st_url)
            .setDescription(stripIndents`Thank you for the report. We take reports very seriously. If necessary, you will be contacted for
                additional information regarding this report. If there is anything else you would like to add, please contact a supervisor to let
                them know.`)
            .setFooter('SanTrans Automation')
            .setTimestamp();

        if (!additional.startsWith('no') || !additional.startsWith('n/a')) {
            report_embed.addField('Additional Information', additional);
        }

        console.log(`Report from ${message.author.username}#${message.author.discriminator}`.red);
        console.log('Offender\'s Name: %s', name);
        console.log('Report reason: %s', reason);
        console.log('Evidence: %s', evidence);
        if (!log_channel || !(log_channel instanceof TextChannel)) {
            console.log('Could not find log channel'.red);
            return message.reply('could not find log channel, but I\'ve still logged the information.');
        }

        console.timeEnd('meow');

        message.channel.bulkDelete(message.channel.messages.array().length)
            .then(_ => _)
            .catch(_ => console.log('Something went wrong when attempting to bulk delete on %s, but it\'s caught, so just ignore it',
            // casting message.channel is safe here because message.channel won't be DMChannel because of the 'guildOnly' setting
            (message.channel as TextChannel).name));

        message.author.send(replying_embed)
            .then(_ => _)
            .catch(e => console.log('Tried DMing %s, but failed. Probably has DMs disabled or so.', message.author.username + '#' + message.author.discriminator));

        return log_channel.send(report_embed);
    }
}