// import React, { useState } from 'react';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
//
// const BackgroundSwitcher = () => {
//     const backgrounds = [
//         { id: 'bg1', name: 'Space', path: '/backgrounds/space.gif' },
//         { id: 'bg2', name: 'Forest', path: '/backgrounds/forest.jpg' },
//         { id: 'bg3', name: 'Ocean', path: '/backgrounds/ocean.gif' },
//         { id: 'bg4', name: 'Mountains', path: '/backgrounds/mountains.jpg' }
//     ];
//
//     const [selectedBg, setSelectedBg] = useState(backgrounds[0].path);
//
//     const handleBackgroundChange = (value: React.SetStateAction<string>) => {
//         setSelectedBg(value);
//     };
//
//     return (
//         <div
//             style={{
//                 backgroundImage: `url(${selectedBg})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 backgroundRepeat: 'no-repeat',
//                 position: 'fixed',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 zIndex: -1,
//             }}
//         >
//             <div className="fixed top-4 right-4 z-50">
//                 <Select onValueChange={handleBackgroundChange} value={selectedBg}>
//                     <SelectTrigger className="w-[180px] bg-white/80 backdrop-blur-sm">
//                         <SelectValue placeholder="Choose background" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         {backgrounds.map((bg) => (
//                             <SelectItem key={bg.id} value={bg.path}>
//                                 {bg.name}
//                             </SelectItem>
//                         ))}
//                     </SelectContent>
//                 </Select>
//             </div>
//         </div>
//     );
// };
//
// export default BackgroundSwitcher;