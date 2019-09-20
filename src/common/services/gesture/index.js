
import Hammer from 'hammerjs';

class Gesture {
  constructor(options = {}) {
    this.hammerIns = null;
    this.Hammer = Hammer;
    this.options = options;
  }

  static getInstance(options = {}) {
    if (!this.instance) {
      this.instance = new Gesture(options);
    }
    return this.instance;
  }

  addElement(element) {
    this.hammerIns = new Hammer.Manager(element, {
      touchAction: 'auto',
      inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
      recognizers: [
        [Hammer.Pan, {
          direction: Hammer.DIRECTION_VERTICAL
        }],
        [Hammer.Swipe, {
          direction: Hammer.DIRECTION_HORIZONTAL
        }]
      ],
      ...this.options
    });
    return this;
  }

  on(eventName, eventHandle) {
    const { hammerIns } = this;
    if (hammerIns) {
      // switch(eventName) {
      //   case 'panup':
      //   case 'pandown': hammerIns.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL }); break;
      //   case 'panmove': hammerIns.get('pan').set({ direction: Hammer.DIRECTION_ALL }); break;
      //   case 'swipeup': 
      //   case 'swipedown': hammerIns.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL }); break;
      // }
      hammerIns.on(eventName, eventHandle);
    }

    return this;
  }
} 

export default Gesture;

