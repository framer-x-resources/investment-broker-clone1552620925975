import { Data, animate, Override, Animatable } from 'framer'
import { sleep } from './utils'

window.log = console.log
const data = Data({
  stage: [true, false, false, false, false],
  loading: false,
  stage00Opacity: Animatable(1),
  stage00OverlaysTop: Animatable(76),
  stage01Opacity: Animatable(0),
  stage01Bottom: Animatable(0),

  slide01Top: Animatable(667),
  slide02Top: Animatable(667),
  slide03Top: Animatable(667),
  slide04Top: Animatable(667),

  //stage02
  stage02Scale: Animatable(1),
  stage02Left: Animatable(0),
  isProd: false,

  //stage04
  stage04Opacity: Animatable(0),

  // card01
  card01Right: Animatable(11),
  card01Left: Animatable(11),
  card01Top: Animatable(350),
  card01Bottom: Animatable(101),
  card01Radius: Animatable(5),

  // card02
  card02Bottom: Animatable(0),

  // stage04 Actions
  stage04ActionsBottom: Animatable(-200),
})

var defaultEase = {
  duration: 0.4,
}

export const Stage00: Override = () => {
  return {
    visible: data.stage[0],
    opacity: data.stage00Opacity,
  }
}

export const Stage00Overlays: Override = () => {
  return {
    top: data.stage00OverlaysTop,
  }
}

export const Stage00Button: Override = () => {
  return {
    async onTap() {
      // hide stage00
      animate.ease(
        data.stage00OverlaysTop,
        data.stage00OverlaysTop.get() - 100,
        {
          duration: 0.4,
        }
      )
      await animate.ease(data.stage00Opacity, 0, {
        duration: 0.4,
      }).finished

      // show stage01
      data.stage = [false, true, false, false, false]

      animate.ease(data.stage01Opacity, 1, {
        duration: 0.4,
      })
      data.stage01Bottom.set(-20)
      animate.ease(data.stage01Bottom, 0, {
        duration: 0.4,
      })
    },
  }
}

export const Stage01: Override = () => {
  return {
    visible: data.stage[1],
    opacity: data.stage01Opacity,
    bottom: data.stage01Bottom,
  }
}

export const Loading: Override = () => {
  return {
    visible: data.loading,
  }
}

export const Stage01Button: Override = () => {
  return {
    async onTap() {
      // hide stage01
      animate.ease(data.stage01Opacity, 0, defaultEase)
      // show loading
      data.stage = [false, false, false, false, false]
      data.loading = true
      // show stage02
      await sleep(data.isProd ? 2.5 : 0.2)
      data.stage = [false, false, true, false, false]
      animate.ease(data.slide01Top, 0, defaultEase)
      await sleep(0.2)
      animate.ease(data.slide02Top, 100, defaultEase)
      await sleep(0.2)
      animate.ease(data.slide03Top, 415, defaultEase)
      await sleep(0.2)
      animate.ease(data.slide04Top, 585, defaultEase)
    },
  }
}
var stage02Open = true
export const Stage02: Override = () => {
  return {
    visible: data.stage[2],
    scale: data.stage02Scale,
    left: data.stage02Left,
    onPan(e) {
      if (e.delta.x > 0 && stage02Open) {
        stage02Open = false
        // close Stage02
        animate.ease(data.stage02Scale, 0.9, defaultEase)
        animate.ease(data.stage02Left, 340, defaultEase)
        // show Stage03
        data.stage = [false, false, true, true, false]
      } else if (e.delta.x < 0 && !stage02Open) {
        stage02Open = true
        // open Stage02

        animate.ease(data.stage02Scale, 1, defaultEase)
        animate.ease(data.stage02Left, 0, defaultEase)
      }
    },
  }
}
export const Slide01: Override = () => {
  return {
    top: data.slide01Top,
  }
}

export const Slide02: Override = () => {
  return {
    top: data.slide02Top,
  }
}

export const Slide03: Override = () => {
  return {
    top: data.slide03Top,
    onTap() {
      if (data.stage[3]) {
        animate.ease(data.slide03Top, 0, defaultEase)

        animate.ease(data.slide01Top, data.slide01Top.get() - 200, defaultEase)
        animate.ease(data.slide02Top, data.slide02Top.get() - 200, defaultEase)
        animate.ease(data.slide04Top, 667, defaultEase)

        // show stage 04
        data.stage = [false, false, true, true, true]
        animate.ease(data.stage04Opacity, 1, defaultEase)
      }
    },
  }
}
export const Slide04: Override = () => {
  return {
    top: data.slide04Top,
  }
}

export const DemoTexts: Override = () => {
  return {
    visible: data.stage[3],
  }
}

export const Stage03: Override = () => {
  return {
    visible: data.stage[3],
  }
}
export const Stage04: Override = () => {
  return {
    visible: data.stage[4],
    opacity: data.stage04Opacity,
  }
}

export const Card01: Override = () => {
  return {
    right: data.card01Right,
    left: data.card01Left,
    top: data.card01Top,
    bottom: data.card01Bottom,
    radius: data.card01Radius,
    async onTap() {
      animate.ease(data.card01Left, 0, defaultEase)
      animate.ease(data.card01Right, 0, defaultEase)
      animate.ease(data.card01Top, 0, defaultEase)
      animate.ease(data.card01Bottom, data.card01Bottom.get() + 50, defaultEase)

      animate.ease(data.card01Radius, 0, defaultEase)

      animate.ease(data.card02Bottom, -200, defaultEase)

      await sleep(0.3)
      animate.ease(data.stage04ActionsBottom, -15, defaultEase)
    },
  }
}
export const Card02: Override = () => {
  return {
    bottom: data.card02Bottom,
  }
}

export const Stage04Actions: Override = () => {
  return {
    bottom: data.stage04ActionsBottom,
  }
}
