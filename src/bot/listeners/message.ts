import { EmojiResolvable, Message } from 'discord.js';

const react_channels: { [key: string]: string | string[]; } = {
    '505825977394528256': [
        '527692448353222682',
        '527692468322566154'
    ]
};

export default function messageHandling(message: Message) {
    if (typeof react_channels !== 'object') { return 0; }
    for (const channel of Object.keys(react_channels)) {
        const emoji_s = react_channels[channel];
        if (typeof emoji_s !== 'object' && typeof emoji_s !== 'string') { return 0; }
        if (channel !== message.channel.id) { return 0; }
        if (typeof emoji_s === 'string') {
            return message.react(emoji_s);
        }

        emoji_s.forEach(async (emoji: EmojiResolvable) => {
            await message.react(emoji);
        });
    }
    return 0;
}