(function(){
/* lib begin */

function debounce(fn, ms = 0) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

function throttle(fn, wait) {
    let inThrottle, lastFn, lastTime;
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function() {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(this, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};

function is_same_size_position(ele1, ele2) {
    try {
        return ele1.clientWidth == ele2.clientWidth &&
            ele1.clientHeight == ele2.clientHeight &&
            ele1.scrollHeight == ele2.scrollHeight;
    } catch {
        return false;
    }
}

function find_top_wrap_ele(ele) {
    let wrap = ele;
    while (ele.tagName !== 'BODY') {
        ele = ele.parentElement;
        if (is_same_size_position(wrap, ele)) {
            wrap = ele;
        }
    }
    return wrap;
}

function is_parent(ele, parent) {
    while (ele.tagName !== 'BODY' &&
           ele !== parent && ele.parentElement !== parent) {
        ele = ele.parentElement;
    }
    return ele.parentElement === parent;
}

function flatten(array) {
    if (!Array.isArray(array)) {
        return [array];
    } else if (array.length == 0) {
        return [];
    } else {
        return flatten(array[0]).concat(flatten(array.slice(1)));
    }
}

function zero_padding(number, length = 2) {
    return Array(Math.max(length - number.toString().length, 0) + 1).join(0) + number;
}

function sec2HHMMSS(time, sec_base = 1) {
    const sec = sec_base, min = 60 * sec, hour = 60 * min;
    const h = Math.floor(time / hour);
    const m = Math.floor(time % hour / min);
    const s = Math.floor(time % min / sec);
    let result = zero_padding(m) + ':' + zero_padding(s);
    if (h) {
        return zero_padding(h) + ':' + result;
    } else {
        return result;
    }
}

function HHMMSS2sec(time, sec_base = 1) {
    const sec = sec_base, min = 60 * sec, hour = 60 * min;
    const split = time.split(':');
    if (split.length < 3) {
        split.unshift(0);
    }
    const h = split[0];
    const m = split[1];
    const s = split[2];
    return h * hour + m * min + s * sec;
}

function get_1cm_pixel_num() {
    const div = document.createElement('div');
    div.style.cssText = ['position: fixed', 'width: 1cm', 'visibility: hidden'].join('; ');
    document.body.append(div);
    const pixel = div.clientWidth;
    div.remove();
    get_1cm_pixel_num = () => pixel;
    return pixel;
}

function px2cm(px) {
    return px / get_1cm_pixel_num();
}

/* lib end */

/* add custom event begin */

function copy(obj) {
    const new_obj = {};
    for (let i in obj) {
        new_obj[i] = obj[i];
    }
    return new_obj;
}

function TapEvent(touch_event) {
    return new TouchEvent('tap',
                          Object.assign(copy(touch_event),
                                        { bubbles: true, cancelable: true, composed: true }));
}

function DoubleTapEvent(touch_event) {
    return new TouchEvent('doubletap',
                          Object.assign(copy(touch_event),
                                        { bubbles: true, cancelable: true, composed: true }));
}

function TouchEvent2MouseEvent(event_type, event) {
    const touch = event.targetTouches && event.targetTouches[0] || {};
    return new MouseEvent(event_type,
                          Object.assign({}, copy(event), copy(touch),
                                        { bubbles: true, cancelable: true, composed: true }));
}

function add_tap_event_hook(element) {
    let start_touch, end_touch, end_event = {};
    const start = e => {
        start_touch = end_touch = copy(e.touches[0]);
        end_event = copy(e);
    };
    const move = e => {
        end_touch = copy(e.touches[0]);
        end_event = copy(e);
    };
    const end = e => {
        if (Math.abs(start_touch.clientX - end_touch.clientX) <= 10 &&
            Math.abs(start_touch.clientY - end_touch.clientY) <= 10) {
            e.target.dispatchEvent(new TapEvent(end_event));
            e.preventDefault();
            e.target.dispatchEvent(TouchEvent2MouseEvent('click', end_event));
        }
    };

    element.addEventListener('touchstart', start, true);
    element.addEventListener('touchmove', move, true);
    element.addEventListener('touchend', end, true);

    return function event_clearer() {
        element.removeEventListener('touchstart', start, true);
        element.removeEventListener('touchmove', move, true);
        element.removeEventListener('touchend', end, true);
    };
}

function add_doubletap_event_hook(element) {
    let start_time = 0;
    const doubletap_judge = e => {
        if (Date.now() - start_time <= 250) {
            start_time = 0;
            e.target.dispatchEvent(new DoubleTapEvent(e));
        } else {
            start_time = Date.now();
        }
    };

    element.addEventListener('tap', doubletap_judge, true);

    return function event_clearer() {
        element.removeEventListener('tap', doubletap_judge, true);
    };
}

/* add custom event end */

function create_prompt_panel() {
    const prompt_div = document.createElement('div');
    const prompt_symbol_div = document.createElement('div');
    const prompt_time_div = document.createElement('div');
    const prompt_time_begin_span = document.createElement('span');
    const prompt_time_end_span = document.createElement('span');

    prompt_div.append(prompt_symbol_div, prompt_time_div);
    prompt_time_div.append(prompt_time_begin_span, ' / ', prompt_time_end_span);

    prompt_div.style.cssText = `
    width: 10em;
    position: absolute;
    z-index: 99999999;
    left: 50%;
    top: 50%;
    padding: 15px 0px;
    margin: calc(-0.5em - 15px) auto auto -5em;
    background-color: rgba(51, 51, 51, 0.8);
    border-radius: 15px;
    text-align: center;
    font-size: 0.5cm;
    color: white;
    display: none;
    `;
    prompt_time_begin_span.style.color = '#2fb3ff';

    return {
        div: prompt_div,
        symbol: prompt_symbol_div,
        left_time: prompt_time_begin_span,
        right_time: prompt_time_end_span,
    };
}

function create_control_panel() {
    const div = document.createElement('div');
    const content_divs = Array(5).fill().map(() => document.createElement('div'));
    div.append.apply(div, content_divs);

    div.style.cssText = `
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: absolute;
    z-index: 9999999999;
    top: 0;
    background-color: rgba(51, 51, 51, 0.8);
    color: white;
    box-sizing: border-box;
    display: none;
    justify-content: center;
    align-items: center;
    font-size: 1cm;
    pointer-events: auto;
    `;

    return {
        display() {
            div.style.display = 'flex';
        },
        hidden() {
            div.style.display = 'none';
        },
        toggle() {
            if (div.style.display === 'flex') {
                this.hidden();
            } else {
                this.display();
            }
        },
        div,
        content_divs,
    };
}

const get_video_touch_hook = (video, e) => {
    let top_wrap = find_top_wrap_ele(video);
    if (top_wrap === video) {
        top_wrap = document.createElement('div');
        video.parentElement.insertBefore(top_wrap, video);
        top_wrap.append(video);
    }

    const event_clearer = [add_tap_event_hook, add_doubletap_event_hook].map(x => x(top_wrap));

    const hook_fn = {
        start: [],
        move: [],
        end: [],
    };

    let start_x, start_time;
    const touch_start = e => {
        start_x = e.touches[0].screenX;
        start_time = video.currentTime;

        hook_fn.start.forEach(fn => fn(e, start_time));
    };
    if (e) {
        setTimeout(touch_start, 0, e);
    }

    const touch_move = e => {
        const end_x = e.touches[0].screenX;
        const x_distance_px = end_x - start_x;
        const time_length = px2cm(x_distance_px) * (this.sec_1cm || 1);

        hook_fn.move.forEach(fn => fn(e, start_time, x_distance_px, time_length));
    };

    const touch_end = e => {
        hook_fn.end.forEach(fn => fn(e));
    };

    top_wrap.addEventListener('touchstart', touch_start, { passive: false });
    top_wrap.addEventListener('touchmove', touch_move, { passive: false });
    top_wrap.addEventListener('touchend', touch_end, { passive: false });

    const remove_hook = () => {
        top_wrap.removeEventListener('touchstart', touch_start);
        top_wrap.removeEventListener('touchmove', touch_move);
        top_wrap.removeEventListener('touchend', touch_end);
    };

    return { video, hook_fn, wrap: top_wrap, event_clearer: event_clearer.concat(remove_hook) };
};

const hook_video_move = hook => {
    const {video, hook_fn} = hook;

    hook_fn.start.push(() => {
        paused = video.paused;
    });

    let playing;
    const pause = () => {
        if (!video.paused) {
            video.pause();
            playing = true;
        }
    };
    const play = debounce(() => {
        if (playing) {
            video.play();
            playing = false;
        }
    }, 100);

    hook_fn.move.push((e, start_time, x_distance_px, time_length) => {
        pause();
        video.currentTime = Math.max(Math.min(start_time + time_length,
                                              video.duration),
                                     0);
        play();
    });
};

const hook_video_time_change = hook => {
    const {video, hook_fn, event_clearer} = hook;
    const top_wrap = find_top_wrap_ele(video);
    const video_prompt = create_prompt_panel();
    top_wrap.append(video_prompt.div);

    event_clearer.push(() => video_prompt.div.remove());

    hook_fn.start.push(() => {
        video_prompt.right_time.innerText = sec2HHMMSS(video.duration);
    });

    hook_fn.move.push((e, start_time, x_distance_px, time_length) => {
        video_prompt.div.style.display = 'block';
        time_length = video.currentTime - start_time;
        video_prompt.symbol.innerText = time_length < 0 ? '-' : '+';
        video_prompt.symbol.innerText += sec2HHMMSS(Math.abs(time_length));
        video_prompt.left_time.innerText = sec2HHMMSS(video.currentTime);
    });

    hook_fn.end.push(() => {
        video_prompt.div.style.display = 'none';
    });
};

const hook_video_control = hook => {
    const {video, hook_fn, event_clearer} = hook;
    const top_wrap = find_top_wrap_ele(video);
    const wrap = document.createElement('div');
    const paddle_div = document.createElement('div');
    const speed_div = document.createElement('div');
    const jump_div = document.createElement('div');
    const skip_div = document.createElement('div');
    const fullscreen_div = document.createElement('div');
    const control = create_control_panel();

    top_wrap.append(wrap);
    const buttons = [paddle_div, speed_div, jump_div, skip_div, fullscreen_div];
    wrap.append.apply(wrap, buttons);
    wrap.append(control.div);

    wrap.style.cssText = `
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    pointer-events: none;
    z-index: 9999999999;
    display: none;
    `;

    const update_wrap_size = () => {
        wrap.style.fontSize = `${Math.min(video.clientHeight, video.clientWidth) / buttons.length / 4}px`;
    };

    update_wrap_size();

    buttons.forEach(div => div.style.cssText =
    `
    width: 3em;
    height: 3em;
    line-height: 3em;
    text-align: center;
    border: solid white;
    border-radius: 100%;
    color: white;
    pointer-events: auto;
    `);

    paddle_div.style.pointerEvents = 'none';
    paddle_div.style.visibility = 'hidden';

    const skip_video = throttle(e => {
        video.currentTime = video.duration;
    }, 500);
    const toggle_play_state = throttle(e => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }, 500);
    const toggle_fullscreen = throttle(e => {
        if (document.fullscreen) {
            document.exitFullscreen();
        } else {
            top_wrap.requestFullscreen();
        }
    }, 500);

    const update_button = () => {
        speed_div.innerText = video.playbackRate + 'x';
        jump_div.innerText = sec2HHMMSS(video.currentTime);
    };
    const hidden_wrap = () => {
        control.hidden();
        wrap.style.display = 'none';
        wrap.style.pointerEvents = 'none';
    };

    const hidden_wrap_delay = debounce(hidden_wrap, 3000);

    const display_wrap = throttle((e) => {
        update_wrap_size();
        wrap.style.display = 'block';
        update_button();
        hidden_wrap_delay();
    }, 1000);

    const prevent_event = e => {
        if (e.cancelable) {
            e.preventDefault();
        }
        e.stopImmediatePropagation();
    };

    skip_div.innerText = 'skip';
    fullscreen_div.innerText = 'FS';

    skip_div.addEventListener('tap', skip_video);
    fullscreen_div.addEventListener('tap', toggle_fullscreen);

    wrap.addEventListener('touchend', prevent_event);

    wrap.addEventListener('touchmove', e => {
        prevent_event(e);
        update_button();
        hidden_wrap_delay();
    });

    top_wrap.addEventListener('tap', display_wrap);
    top_wrap.addEventListener('doubletap', toggle_play_state);

    event_clearer.push(() => {
        top_wrap.removeEventListener('tap', display_wrap);
        top_wrap.removeEventListener('doubletap', toggle_play_state);
        wrap.remove();
    });

    function speed_activate() {
        video.playbackRate = parseFloat(control.div.innerText.replace(/[\r\n]+/g, ''));
        update_button();
        hidden_wrap();
    }

    function jump_activate() {
        video.currentTime = HHMMSS2sec(control.div.innerText.replace(/[\r\n]+/g, ''));
        update_button();
        hidden_wrap();
    }

    function clear_content() {
        control.content_divs.forEach(div => div.innerHTML = '');
    }

    const set_content_tap_fn = (() => {
        let bind_fn = [];
        return fn => {
            bind_fn.forEach(([div, fn]) => div.removeEventListener('tap', fn));
            bind_fn = [];
            control.content_divs.forEach(div => {
                bind_fn.push([div, fn]);
                div.addEventListener('tap', fn);
            });
        };
    })();

    let state = [];
    function set_state() {
        control.content_divs.forEach((div, i) => state[i] = div.innerText);
    }

    let start_y, modifier;
    const start = e => {
        start_y = e.touches[0].screenY;
        set_state();
    };
    const move = e => {
        const end_y = e.touches[0].screenY;
        const y_distance_px = start_y - end_y;
        const increase = Math.floor(px2cm(y_distance_px) * (this.increase_1cm || 1));
        const idx = Array.from(e.target.parentElement.children).indexOf(e.target);
        if (modifier[idx]) {
            modifier[idx](increase);
        }
    };

    const increase_helper = (state_idx, increase,
                             limit, pre_ele_modifier, wrap = x => x) => {
         const v = parseFloat(state[state_idx]) + increase;
         if (limit !== undefined) {
             if (pre_ele_modifier) {
                 if (v >= limit) {
                     pre_ele_modifier(Math.floor(v / limit));
                     control.content_divs[state_idx].innerText = wrap(v % limit);
                 } else if (v < 0) {
                     pre_ele_modifier(-1);
                     control.content_divs[state_idx].innerText = wrap(limit + v);
                 } else {
                     control.content_divs[state_idx].innerText = wrap(v);
                 }
             } else {
                 control.content_divs[state_idx].innerText =
                     wrap(Math.min(Math.max(v, 0), limit));
             }
         } else {
             control.content_divs[state_idx].innerText = wrap(v);
         }
     };

    const speed_modifier = [];
    speed_modifier[0] = (increase) => {
        increase_helper(0, increase);
    };
    speed_modifier[2] = (increase) => {
        increase_helper(2, increase, 10, speed_modifier[0]);
    };
    speed_modifier[3] = (increase) => {
        increase_helper(3, increase, 10, speed_modifier[2]);
    };


    const jump_modifier = [];
    jump_modifier[0] = (increase) => {
        increase_helper(0, increase, undefined, undefined, zero_padding);
    };
    jump_modifier[2] = (increase) => {
        increase_helper(2, increase, 60, jump_modifier[0], zero_padding);
    };
    jump_modifier[4] = (increase) => {
        increase_helper(4, increase, 60, jump_modifier[2], zero_padding);
    };

    speed_div.addEventListener('tap', throttle(e => {
        e.stopImmediatePropagation();
        clear_content();
        const split = video.playbackRate.toString().split('.');
        control.content_divs[0].innerText = split[0];
        control.content_divs[1].innerText = '.';
        control.content_divs[2].innerText = (split[1] || '00').split('')[0] || 0;
        control.content_divs[3].innerText = (split[1] || '00').split('')[1] || 0;
        control.content_divs[4].innerText = 'x';
        modifier = speed_modifier;
        set_content_tap_fn(speed_activate);
        control.display();
        wrap.style.pointerEvents = 'auto';
    }, 500));

    jump_div.addEventListener('tap', throttle(e => {
        e.stopImmediatePropagation();
        clear_content();
        const time = sec2HHMMSS(video.currentTime);
        const split = time.split(':');
        if (split.length < 3) {
            split.unshift('00');
        }
        control.content_divs[0].innerText = split[0];
        control.content_divs[1].innerText = ':';
        control.content_divs[2].innerText = split[1];
        control.content_divs[3].innerText = ':';
        control.content_divs[4].innerText = split[2];
        modifier = jump_modifier;
        set_content_tap_fn(jump_activate);
        control.display();
        wrap.style.pointerEvents = 'auto';
    }, 500));

    control.content_divs.forEach(div => {
        div.addEventListener('touchstart', start, { passive: false });
        div.addEventListener('touchmove', move, { passive: false });
    });
};

function get_frames(window) {
    const frames = [window];
    for (let i = 0; i < window.frames.length; i++) {
        try {
            window.frames[i].document;
        } catch {
            continue;
        }

        frames.push(...get_frames(window.frames[i]))
    }
    return frames;
}

function get_videos() {
    const frames = get_frames(window);
    const frame_video = frame => Array.from(frame.document.querySelectorAll('video'));
    const shadow = frame => Array.from(frame.document.querySelectorAll("shadow-output"));
    const shadow_video = shadow => Array.from(shadow.shadowRoot.querySelectorAll("video"));
    return flatten(frames.map(frame_video)
                   .concat(frames.map(f => shadow(f).map(shadow_video))));
}

function find_hook(video) {
    window.__hook_video__ = window.__hook_video__ || [];
    const exist_video = window.__hook_video__.find(v => v.video === video);
    return exist_video;
}

function register_hook(hook) {
    if (!find_hook(hook.video)) {
        window.__hook_video__.push(hook);
        return hook;
    }
}

const hook_video = (video) => {
    const exist_video = find_hook(video);
    if (video.clientWidth && video.clientHeight &&
        (!exist_video || is_parent(exist_video.wrap, find_top_wrap_ele(video)))) {
        const hook = get_video_touch_hook(video);
        hook_video_move(hook);
        hook_video_time_change(hook);
        hook_video_control(hook);

        if (exist_video) {
            exist_video.event_clearer.forEach(x => x());
            Object.assign(exist_video, hook);
            console.log('video-improve: reloaded for ', video, ', wrapped by ', find_top_wrap_ele(video));
        } else {
            register_hook(hook);
            console.log('video-improve: loaded for ', video, ', wrapped by ', find_top_wrap_ele(video));
        }
    }
};

get_videos().forEach(hook_video);
})()
