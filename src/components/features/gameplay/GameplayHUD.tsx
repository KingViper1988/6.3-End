import React from 'react';
import { Menu, Clock } from 'lucide-react';
import { WorldData, GameTime } from '../../../types';
import { formatGameTime } from '../../../utils/timeUtils';
import { DynamicHUD } from './components/DynamicHUD';

interface GameplayHUDProps {
    activeWorld?: WorldData | null;
    turnCount: number;
    gameTime: GameTime;
    setShowMobileSidebar: (v: boolean) => void;
}

export const GameplayHUD: React.FC<GameplayHUDProps> = ({ activeWorld, turnCount, gameTime, setShowMobileSidebar }) => {
    return (
        <>
            <header className="min-h-14 md:h-16 shrink-0 bg-stone-200/95 dark:bg-mystic-900/95 border-b border-stone-400 dark:border-slate-800 flex items-center justify-center relative px-14 md:px-4 z-30 shadow-sm backdrop-blur-xl">
                 <button 
                    className="md:hidden absolute left-3 h-10 w-10 rounded-xl border border-stone-300 dark:border-slate-700 bg-white/40 dark:bg-slate-950/30 text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white flex items-center justify-center active:scale-95 transition-all"
                    onClick={() => setShowMobileSidebar(true)}
                 >
                     <Menu size={20} />
                 </button>
                 <div className="flex min-w-0 flex-col items-center">
                     <h1 className="font-bold text-stone-800 dark:text-slate-200 text-xs md:text-sm tracking-wide leading-tight font-mono truncate max-w-[52vw] sm:max-w-[70vw] md:max-w-none">
                         {activeWorld?.world?.worldName || "Thế giới vô danh"}
                     </h1>
                     <div className="mt-0.5 flex items-center gap-2">

                        <span className="text-[9px] md:text-[10px] font-mono font-bold text-mystic-accent bg-mystic-accent/10 px-1.5 md:px-2 py-0.5 rounded-full border border-mystic-accent/20 leading-none">
                            Lượt: {turnCount}
                        </span>
                        <span className="text-[9px] md:text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-1.5 md:px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1 leading-none">
                            <Clock size={8} className="md:size-2.5" />
                            {formatGameTime(gameTime)}
                        </span>
                     </div>
                 </div>
            </header>

            <DynamicHUD worldData={activeWorld} gameTime={gameTime} turnCount={turnCount} />
        </>
    );
};
