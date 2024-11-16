export interface Stream {
    id: string;
    title: string;
    icon?: string;  // Optional icon for each stream
}

export const STREAMS: Stream[] = [
    { 
        id: 'jfKfPfyJRdk', 
        title: 'lofi hip hop radio 📚 beats to relax/study to',
        icon: './globe.svg'
    },
    { 
        id: '4xDzrJKXOOY', 
        title: 'synthwave radio 🌊 - beats to chill/game to',
        icon: './play.svg'
    },
    { 
        id: '5qap5aO4i9A', 
        title: 'lofi hip hop radio - beats to sleep/chill to',
        icon: './pause.svg'
    },
]; 