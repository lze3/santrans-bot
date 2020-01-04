import { EmojiResolvable, Message } from 'discord.js';

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
export const messageHandling = (message: Message) => {
    if (typeof react_channels !== 'object') { return 0; }
    for (const channel of Object.keys(react_channels)) {
        const emoj = react_channels[channel];
        if (typeof emoj !== 'string' && typeof emoj !== 'object') { return 0; }
        if (channel !== message.channel.id) { return 0; }
        if (typeof emoj === 'string') {
            return message.react(emoj);
        }

        emoj.forEach(async (emoji: EmojiResolvable) => {
            await message.react(emoji);
        });
    }
    return 0;
};