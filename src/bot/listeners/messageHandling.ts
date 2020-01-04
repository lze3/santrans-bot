import { EmojiResolvable, Message, MessageReaction } from 'discord.js';

const react_channels: { [key: string]: string | string[]; } = {
    '505825977394528256': [
        '527692448353222682',
        '527692468322566154'
    ]
};

/**
 *
 * Handles non-command messages that are still useful.
 *
 * @param {Message} message Message called back from 'message' listener.
 */
// tslint:disable-next-line:typedef
export const messageHandling = (message: Message) => {
    if (typeof react_channels !== 'object') { return 0; }
    for (const [channel, emoji] of Object.entries(react_channels)) {
        if (typeof emoji !== 'string' && typeof emoji !== 'object') { return 0; }
        if (channel !== message.channel.id) { return 0; }
        if (typeof emoji === 'string') {
            return message.react(emoji);
        }

        emoji.forEach(async (emoj: EmojiResolvable) => {
            await message.react(emoj);
        });
    }
    return 0;
};