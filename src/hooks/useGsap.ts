import { onBeforeUnmount } from 'vue';
import { gsap, type TweenTarget, type TweenVars } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type GsapMethod = 'to' | 'from' | 'fromTo';

export function useGsap() {
  const animations: (gsap.core.Tween | gsap.core.Timeline)[] = [];

  function animate(
    method: GsapMethod,
    target: TweenTarget,
    varsOrFromVars: TweenVars,
    toVars?: TweenVars
  ) {
    let tween: gsap.core.Tween;
    if (method === 'fromTo' && toVars) {
      tween = gsap.fromTo(target, varsOrFromVars, toVars);
    } else {
      tween = gsap[method](target, varsOrFromVars as TweenVars);
    }
    animations.push(tween);
    return tween;
  }

  function createTimeline(options?: gsap.TimelineVars) {
    const tl = gsap.timeline(options);
    animations.push(tl);
    return tl;
  }

  function animateBatch(
    target: TweenTarget,
    vars: TweenVars & { batchVars?: gsap.plugins.ScrollTrigger.BatchVars }
  ) {
    ScrollTrigger.batch(target, {
      ...vars.batchVars,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, ...vars }),
    });
  }

  function scrollTrigger(target: TweenTarget, vars: TweenVars & { trigger?: Element | string }) {
    const tween = gsap.to(target, {
      ...vars,
      scrollTrigger: {
        trigger: vars.trigger || target,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
        markers: false,
        ...vars.scrollTrigger,
      },
    });
    animations.push(tween);
    return tween;
  }

  onBeforeUnmount(() => {
    animations.forEach(anim => anim.kill());
    ScrollTrigger.getAll().forEach(st => st.kill());
  });

  return { animate, createTimeline, animateBatch, scrollTrigger };
}