import numpy as np
from scipy.io import wavfile
SR = 44100
rng = np.random.default_rng(7)
OUT = 'public/sfx/'

def save(name, x, peak=0.7):
    x = np.asarray(x, dtype=np.float64)
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    x[:64] *= np.linspace(0, 1, 64); x[-256:] *= np.linspace(1, 0, 256)
    wavfile.write(OUT + name + '.wav', SR, (x * 32767).astype(np.int16))

def lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); s = 0.0
    for i, v in enumerate(x):
        s = (1 - a) * v + a * s; y[i] = s
    return y

def whoosh(dur, f0, f1, q=1.4, peak=0.5):
    n = int(dur * SR); noise = rng.standard_normal(n)
    low = band = 0.0; out = np.zeros(n)
    for i in range(n):
        f = f0 * (f1 / f0) ** (i / n)
        F = 2 * np.sin(np.pi * f / SR); Q = 1 / q
        low += F * band; high = noise[i] - low - Q * band; band += F * high; out[i] = band
    tt = np.linspace(0, 1, n) ** (np.log(0.5) / np.log(peak))
    return out * np.sin(np.pi * tt) ** 2

def tone_env(dur, f, decay, harm=(1, 0.4, 0.15)):
    t = np.arange(int(dur * SR)) / SR
    return sum(h * np.sin(2 * np.pi * f * (k + 1) * t) for k, h in enumerate(harm)) * np.exp(-t * decay)

save('whoosh_a', whoosh(0.7, 300, 3200, 1.2, 0.6), 0.55)
save('whoosh_b', whoosh(0.7, 3000, 350, 1.2, 0.4), 0.55)
save('whoosh_c', whoosh(0.4, 600, 2200, 1.8, 0.5), 0.5)
save('whoosh_d', whoosh(0.6, 200, 900, 1.0, 0.5), 0.5)
save('whoosh_e', whoosh(0.6, 900, 5000, 2.0, 0.55), 0.4)
save('swipe', whoosh(0.28, 1500, 5500, 2.2, 0.45), 0.45)

t = np.arange(int(0.2 * SR)) / SR
pop = np.sin(2 * np.pi * (180 + 340 * np.exp(-t * 40)) * t) * np.exp(-t * 26)
click_n = lp(rng.standard_normal(len(t)), 5000) * np.exp(-t * 300) * 0.5
save('pop', pop + click_n, 0.6)

t = np.arange(int(0.07 * SR)) / SR
click = lp(rng.standard_normal(len(t)), 4500) * np.exp(-t * 160) + 0.5 * np.sin(2 * np.pi * 1100 * t) * np.exp(-t * 120)
save('click', click, 0.5)
t = np.arange(int(0.045 * SR)) / SR
save('tick', lp(rng.standard_normal(len(t)), 3500) * np.exp(-t * 220), 0.4)

# Karplus-Strong pluck
f0 = 523.25; N = int(SR / f0); buf = rng.uniform(-1, 1, N); out = []
for i in range(int(0.55 * SR)):
    out.append(buf[i % N]); buf[i % N] = 0.4975 * (buf[i % N] + buf[(i + 1) % N])
save('pluck', lp(np.array(out), 5000), 0.55)

# bell-like chime (inharmonic partials, soft attack)
t = np.arange(int(0.9 * SR)) / SR
chime = sum(a * np.sin(2 * np.pi * 988 * r * t) * np.exp(-t * d) for r, a, d in [(1, 1, 5), (2.01, 0.45, 7), (2.76, 0.25, 9), (4.07, 0.12, 12)])
chime *= np.minimum(1, t / 0.006)
save('chime', chime, 0.5)

# soft low thump (no heavy boom)
t = np.arange(int(0.4 * SR)) / SR
thump = np.sin(2 * np.pi * (48 + 70 * np.exp(-t * 30)) * t) * np.exp(-t * 14) + 0.2 * lp(rng.standard_normal(len(t)), 300) * np.exp(-t * 30)
save('thump', thump, 0.55)
print('sfx ok')
