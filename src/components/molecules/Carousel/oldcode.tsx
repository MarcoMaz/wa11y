// interface CarouselProps {
//   ariaLabelMainTopic: string;
//   ariaLabelTopic: string;
//   items: CarouselCardProps[];
// }

// const Carousel: React.FC<CarouselProps> = ({
//   ariaLabelMainTopic,
//   ariaLabelTopic,
//   items,
// }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [liveText, setLiveText] = useState('');
//   const containerRef = useRef<HTMLUListElement>(null);
//   const [lastInteraction, setLastInteraction] = useState<'button' | 'dot'>(
//     'button'
//   );

//   const scrollToIndex = (index: number) => {
//     const container = containerRef.current;
//     if (container) {
//       const itemWidth = container.scrollWidth / items.length;
//       container.scrollTo({
//         left: index * itemWidth,
//         behavior: 'smooth',
//       });
//     }
//   };

//   const handleScroll = () => {
//     const container = containerRef.current;
//     if (container) {
//       const scrollLeft = container.scrollLeft;
//       const itemWidth = container.scrollWidth / items.length;
//       const newIndex = Math.round(scrollLeft / itemWidth);
//       setActiveIndex(newIndex);
//     }
//   };

//   useEffect(() => {
//     handleScroll();

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener('scroll', handleScroll);
//     }

//     return () => {
//       if (container) {
//         container.removeEventListener('scroll', handleScroll);
//       }
//     };
//   });

//   return (
//     <section className='carousel' aria-label={ariaLabelMainTopic}>
//       <CarouselCards
//         activeIndex={activeIndex}
//         containerRef={containerRef}
//         items={items}
//       />
//       <CarouselControls
//         activeIndex={activeIndex}
//         setActiveIndex={setActiveIndex}
//         items={items}
//         containerRef={containerRef}
//         setLastInteraction={setLastInteraction}
//       />
//       <CarouselNavigation
//         activeIndex={activeIndex}
//         items={items}
//         ariaLabelTopic={ariaLabelTopic}
//         setActiveIndex={setActiveIndex}
//         scrollToIndex={scrollToIndex}
//         lastInteraction={lastInteraction}
//         setLastInteraction={setLastInteraction}
//       />
//       <CarouselLiveRegion
//         activeIndex={activeIndex}
//         items={items}
//         liveText={liveText}
//         setLiveText={setLiveText}
//       />
//     </section>
//   );
// };

// interface CarouselNavigationProps {
//   activeIndex: number;
//   ariaLabelTopic: string;
//   items: CarouselCardProps[];
//   lastInteraction: 'button' | 'dot';
//   scrollToIndex: (index: number) => void;
//   setLastInteraction: React.Dispatch<SetStateAction<'button' | 'dot'>>;
//   setActiveIndex: (index: number) => void;
// }

// const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
//   activeIndex,
//   ariaLabelTopic,
//   items,
//   lastInteraction,
//   scrollToIndex,
//   setLastInteraction,
//   setActiveIndex,
// }) => {
//   const activeDotRef = useRef<HTMLButtonElement | null>(null);
//   const isFirstRender = useRef(true);

//   useLayoutEffect(() => {
//     if (
//       !isFirstRender.current &&
//       lastInteraction === 'dot' &&
//       activeDotRef.current
//     ) {
//       const timerId = setTimeout(() => {
//         activeDotRef.current?.focus({ preventScroll: true });
//       }, 0);

//       return () => clearTimeout(timerId);
//     }
//   }, [activeIndex, lastInteraction]);

//   return (
//     <ul className='carousel__navigation'>
//       {items.map((_, index) => {
//         const navigationAriaLabel = `${ariaLabelTopic} ${index + 1}`;
//         const navigationClassName = index === activeIndex ? '-full' : undefined;
//         const navigationRef = index === activeIndex ? activeDotRef : null;

//         const handleNavigation = (index: number) => {
//           setActiveIndex(index);
//           scrollToIndex(index);
//           setLastInteraction('dot');
//         };

//         return (
//           <li key={index}>
//             <IconButton
//               ariaLabel={navigationAriaLabel}
//               className={navigationClassName}
//               dataSlide={index}
//               ref={navigationRef}
//               onClick={() => {
//                 handleNavigation(index);
//                 setLastInteraction('button');
//               }}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   handleNavigation(index);
//                   setLastInteraction('dot');
//                 }
//               }}
//             >
//               <Circle />
//             </IconButton>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// interface CarouselLiveRegionProps {
//   activeIndex: number;
//   items: CarouselCardProps[];
//   liveText: string;
//   setLiveText: Dispatch<SetStateAction<string>>;
// }

// const CarouselLiveRegion: React.FC<CarouselLiveRegionProps> = ({
//   activeIndex,
//   items,
//   liveText,
//   setLiveText,
// }) => {
//   const SHORT_DELAY: number = 500;

//   useEffect(() => {
//     setLiveText('');

//     const timeoutId = setTimeout(() => {
//       setLiveText(`Item ${activeIndex + 1} of ${items.length}`);
//     }, SHORT_DELAY);

//     return () => clearTimeout(timeoutId);
//   }, [activeIndex, items.length, setLiveText]);

//   return (
//     <div
//       role='status'
//       aria-live='polite'
//       aria-atomic='true'
//       aria-label={liveText}
//     />
//   );
// };

// interface CarouselControlsProps {
//   activeIndex: number;
//   containerRef: React.RefObject<HTMLUListElement>;
//   items: CarouselCardProps[];
//   setActiveIndex: (index: number) => void;
//   setLastInteraction: React.Dispatch<SetStateAction<'button' | 'dot'>>;
// }

// const CarouselControls: React.FC<CarouselControlsProps> = ({
//   activeIndex,
//   containerRef,
//   items,
//   setActiveIndex,
//   setLastInteraction,
// }) => {
//   const SHORT_DELAY: number = 500;
//   const prevButtonRef = useRef<HTMLButtonElement | null>(null);
//   const nextButtonRef = useRef<HTMLButtonElement | null>(null);

//   const updateActiveIndex = (newIndex: number) => {
//     const container = containerRef.current;
//     if (container) {
//       const itemWidth = container.scrollWidth / items.length;
//       container.scrollTo({
//         left: newIndex * itemWidth,
//         behavior: 'smooth',
//       });

//       setTimeout(() => {
//         setActiveIndex(newIndex);
//       }, SHORT_DELAY);
//     }
//   };

//   const handleNext = () => {
//     const newIndex = Math.min(activeIndex + 1, items.length - 1);
//     updateActiveIndex(newIndex);
//     setLastInteraction('button');
//     nextButtonRef.current?.focus();
//   };

//   const handlePrev = () => {
//     const newIndex = Math.max(activeIndex - 1, 0);
//     updateActiveIndex(newIndex);
//     setLastInteraction('button');
//     prevButtonRef.current?.focus();
//   };

//   return (
//     <ul className='carousel__controls'>
//       <li>
//         <IconButton
//           ariaLabel='Previous item'
//           ref={prevButtonRef}
//           onClick={handlePrev}
//         >
//           <ChevronLeft />
//         </IconButton>
//       </li>
//       <li>
//         <IconButton
//           ariaLabel='Next item'
//           ref={nextButtonRef}
//           onClick={handleNext}
//         >
//           <ChevronRight />
//         </IconButton>
//       </li>
//     </ul>
//   );
// };

// interface CarouselCardsProps {
//   activeIndex: number;
//   containerRef: RefObject<HTMLUListElement>;
//   items: CarouselCardProps[];
// }

// const CarouselCards: React.FC<CarouselCardsProps> = ({
//   activeIndex,
//   containerRef,
//   items,
// }) => {
//   return (
//     <ul className='carousel__cards' ref={containerRef}>
//       {items.map(({ id, children }, index) => {
//         const cardsIsActive = index === activeIndex;

//         return (
//           <CarouselCard
//             id={id}
//             key={id}
//             isActive={cardsIsActive}
//             children={children}
//           />
//         );
//       })}
//     </ul>
//   );
// };

// const CarouselCard: React.FC<CarouselCardProps> = ({
//   id,
//   isActive,
//   children,
// }) => {
//   const cardRef = useRef<HTMLLIElement>(null);

//   useEffect(() => {
//     const card = cardRef.current;

//     if (card) {
//       const focusableElements = card.querySelectorAll<HTMLElement>(
//         'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
//       );

//       focusableElements.forEach((element) => {
//         if (!isActive) {
//           element.setAttribute('tabIndex', '-1');
//         } else {
//           element.removeAttribute('tabIndex');
//         }
//       });
//     }
//   }, [isActive]);

//   return (
//     <li
//       className='carousel__card'
//       key={id}
//       ref={cardRef}
//       dangerouslySetInnerHTML={{ __html: children }}
//     />
//   );
// };
