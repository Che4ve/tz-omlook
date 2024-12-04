
export class ProgressBlock extends HTMLElement {
    constructor() {
        super();
        this.value = 0;
        this.isAnimating = false;
        this.isHidden = false;
        this.isCompleted = false;
        this.state = 'normal'; // 'normal' | 'animated' | 'hidden'
    }

    connectedCallback() {
        this.innerHTML = `
            <link rel="stylesheet" href="styles/progressBlock.css">
            <div class="progress-container" id="progress-container">
                <div class="progress" id="progress">
                    <svg class="progress__svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="GradientColor">
                                <stop offset="0%" stop-color="#44d393"/>
                                <stop offset="100%" stop-color="#50e179"/>
                            </linearGradient>
                        </defs>
                        <circle cx="50%" cy="50%"stroke-linecap="round"></circle>
                    </svg>
                    <div class="progress__percentage" id="progress__percentage">0%</div>
                </div>
                <div class="controls">
                    <div class="controls__element" id="controls__element-value">
                        <p>Value</p>
                        <input type="range" id="value-input" min="0" max="100" value="0">
                    </div>
                    <div class="controls__element" id="controls__element-animate">
                        <p>Animate</p>
                        <input type="checkbox" id="animate-toggle">
                    </div>
                    <div class="controls__element" id="controls__element-hide">
                        <p>Hide</p>
                        <input type="checkbox" id="hide-toggle">
                    </div>
                </div>
            </div>
        `
        this.querySelector('#value-input').addEventListener('input', (e) => {
            this.setValue(Number(e.target.value));
        });

        this.querySelector('#animate-toggle').addEventListener('change', (e) => {
            this.setAnimation(e.target.checked);
        });

        this.querySelector('#hide-toggle').addEventListener('change', (e) => {
            this.setHidden(e.target.checked);
        });

        this.updateProgress();
    }

    // Установить значение прогресса (0-100)
    setValue(value) {
        this.value = Math.min(Math.max(value, 0), 100);
        this.updateProgress();
    }

    // Включить/выключить анимацию
    setAnimation(animate) {
        this.isAnimating = animate;
        this.state = this.isAnimating ? 'animated' : 'normal';
        this.toggleAnimation();
    }

    // Показать/скрыть блок
    setHidden(hidden) {
        this.isHidden = hidden;
        this.state = this.isHidden ? 'hidden' : 'normal';
        this.toggleVisibility();
    }

    updateProgress() {
        const percentageText = this.querySelector('#progress__percentage');
        const controlInput = this.querySelector('#value-input');
        const progressSvg = this.querySelector('.progress');

        if (percentageText) {
            percentageText.textContent = `${this.value}%`;
        }

        if (controlInput) {
            controlInput.setAttribute('value', `${this.value}`)
        }

        if (progressSvg) {
            progressSvg.style.setProperty('--percentage', `${this.value}`);
        }

        this.isCompleted = this.value === 100;
        this.toggleCompleted();

        if (this.isCompleted && this.completeCallback) {
            this.completeCallback();
        }
    }

    toggleAnimation() {
        this.classList.toggle('animated', this.isAnimating);
        if (this.isAnimating && this.animationStartCallback) {
            this.animationStartCallback();
        }
    }

    toggleVisibility() {
        this.classList.toggle('hidden', this.isHidden);
        if (this.isHidden && this.hideCallback) {
            this.hideCallback();
        }
    }

    toggleCompleted() {
        this.classList.toggle('completed', this.isCompleted);
    }

    // Функции для обработки событий с аргументами-коллбеками
    onAnimationStart(callback) {
        this.animationStartCallback = callback;
    }

    onComplete(callback) {
        this.completeCallback = callback;
    }

    onHide(callback) {
        this.hideCallback = callback;
    }

}

customElements.define('progress-block', ProgressBlock);
