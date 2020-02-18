import { html, LitElement } from 'lit-element';

import { isInViewportMixin } from './is-in-viewport-mixin';

//Source animations http://daneden.github.io/animate.css
import { animations } from './animations';

export class CrcaAnimation extends isInViewportMixin(LitElement) {

  static get styles() {
    return [
      ...animations
    ];
  }

  static get properties() {
    return {
      /* Nombre de animación opciones disponibles: 'bounce' | 'flash' | 'headShake' | 'heartBeat' | 'jello' | 'pulse' | 'rubberBand' | 'shake' | 'swing' |
      'tada' | 'wobble' | 'bounceInDown' | 'bounceIn' | 'bounceInLeft' | 'bounceInRight' | 'bounceInUp' | 'bounceOutDown' | 'bounceOut' | 'bounceOutLeft' |
      'bounceOutRight' | 'bounceOutUp' | 'fadeInDownBig' | 'fadeInDown' | 'fadeIn' | 'fadeInLeftBig' | 'fadeInLeft' | 'fadeInRightBig' | 'fadeInRight' |
      'fadeInUpBig' | 'fadeInUp' | 'fadeOutDownBig' | 'fadeOutDown' | 'fadeOut' | 'fadeOutLeftBig' | 'fadeOutLeft' | 'fadeOutRightBig' | 'fadeOutRight' |
      'fadeOutUpBig' | 'fadeOutUp' | 'flipInX' | 'flipInY' | 'flip' | 'flipOutX' | 'flipOutY' | 'lightSpeedIn' | 'lightSpeedOut' | 'rotateInDownLeft' | 
      'rotateInDownRight' | 'rotateIn' | 'rotateInUpLeft' | 'rotateInUpRight' | 'rotateOutDownLeft' | 'rotateOutDownRight' | 'rotateOut' | 'rotateOutUpLeft' |
      'rotateOutUpRight' | 'slideInDown' | 'slideInLeft' | 'slideInRight' | 'slideInUp' | 'slideOutDown' | 'slideOutLeft' | 'slideOutRight' | 'slideOutUp' |
      'hinge' | 'jackInTheBox' | 'rollIn' | 'rollOut' | 'zoomInDown' | 'zoomIn' | 'zoomInLeft' | 'zoomInRight' | 'zoomInUp' | 'zoomOutDown' | 'zoomOut' |
      'zoomOutLeft' | 'zoomOutRight' | 'zoomOutUp'  */
      animation: { type: String },
      
      /* Tiempo de espera en la ejecución de la animación Ejemplo: '1s' */
      delay: { type: String },

      /* Tiempo de duración de la animación Ejemplo: '800ms' o '3s' */
      duration: { type: String }
    };
  }

  constructor() {
    super();
    this.animation = 'bounce';
    this.duration = '1s';
    this.delay = 0;
  }

  render() {
    return html`
      <style>
        
      </style>
      
      <slot id="me"></slot>
      
      <!-- <div class="animated ${this._appear ? this.animation : ''}">
        <slot></slot> 
      </div> -->
    `;
  }



  firstUpdated() {
    this.detectFirstViewportAparition(this);
    this._IsInViewportHandler();
    this.injectarEstilos();
    this.addEventListener('viewport-entering', () => {
      
    })
  }

  updated(changedProperties) {
    if(changedProperties.has('_appear')) {
      if(this._appear) {
        console.log('entering');
        this.shadowRoot.getElementById('me').classList.add("animated");
        this.shadowRoot.getElementById('me').classList.add(this.animation);
        this.classList.add("animated");
        this.classList.add(this.animation);
      }
    }
  }

  injectarEstilos() {
    let estilos = document.createElement('style');
    estilos.innerText = `
    body { background-color: red; }
      .animated {
        animation-duration: ${this.duration};
        animation-delay: ${this.delay};
        animation-fill-mode: both;
      }
      @media (print), (prefers-reduced-motion: reduce) {
        .animated {
          animation-duration: 1ms !important;
          transition-duration: 1ms !important;
          animation-iteration-count: 1 !important; 
        }
      }
    `;
    this.append(estilos);
    let animaciones = document.createElement('style');
    let mycss = ''
    animations.forEach(element => {
      mycss += element;
    });
    animaciones.innerText = mycss;
    this.append(animaciones);
  }
}
