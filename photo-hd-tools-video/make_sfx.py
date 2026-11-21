# Synthetic, soft SFX generator (offline). Output: public/sfx/*.wav (44.1kHz mono, 16-bit)
import numpy as np
from scipy.signal import butter, sosfilt
from scipy.io import wavfile
SR = 44100
rng = np.random.default_rng(7)
def t(d): return np.linspace(0, d, int(SR*d), endpoint=False)
def env(n, a, r, curve=2.0):
    e = np.ones(n); na = max(1,int(a*SR)); nr = max(1,int(r*SR))
    e[:na] = np.linspace(0,1,na)**1.5; e[-nr:] *= np.linspace(1,0,nr)**curve
    return e
def bp(x, lo, hi, order=2):
    hi = min(hi, SR/2-100); return sosfilt(butter(order,[lo,hi],btype='band',fs=SR,output='sos'), x)
def lp(x, f): return sosfilt(butter(2,f,btype='low',fs=SR,output='sos'), x)
def norm(x, peak=0.55):
    x = x/ (np.max(np.abs(x))+1e-9) * peak
    n=len(x); x[:32]*=np.linspace(0,1,32); x[-64:]*=np.linspace(1,0,64); return x
def save(name, x): wavfile.write(f"public/sfx/{name}.wav", SR, (norm(x)*32767).astype(np.int16))

def whoosh(d, f0, f1, width=1.6, peak_at=0.45):
    n=int(SR*d); noise=rng.standard_normal(n); out=np.zeros(n)
    # sweep the band centre across blocks
    blocks=24; L=n//blocks
    for i in range(blocks):
        c=f0*(f1/f0)**(i/(blocks-1)); seg=noise[i*L:(i+1)*L if i<blocks-1 else n]
        seg=bp(np.pad(seg,(256,256)), c/width, c*width)[256:-256]; out[i*L:i*L+len(seg)]=seg
    x=np.arange(n)/n; e=np.exp(-((x-peak_at)**2)/(2*0.17**2)); return lp(out*e,6500)
save("whoosh_rise", whoosh(0.62,300,2600,1.5,0.55))
save("whoosh_fall", whoosh(0.55,2400,350,1.5,0.4))
save("whoosh_wide", whoosh(0.78,450,1800,2.2,0.5))
save("whoosh_fast", whoosh(0.36,700,3200,1.4,0.5))
save("whoosh_low",  whoosh(0.7,180,900,1.8,0.5))
def swipe():
    x=whoosh(0.3,900,2400,1.3,0.45); return x
save("swipe", swipe())
def pop():
    d=0.16; tt=t(d); f=520*np.exp(-tt*22)+260
    body=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*28)
    click=bp(rng.standard_normal(len(tt)),1200,4200)*np.exp(-tt*120)*0.35
    return lp(body+click,5000)
save("pop", pop())
def click():
    d=0.07; tt=t(d); n=bp(rng.standard_normal(len(tt)),1500,5000)*np.exp(-tt*90)
    th=np.sin(2*np.pi*190*tt)*np.exp(-tt*70)*0.5; return n+th
save("click", click())
def tick():
    d=0.04; tt=t(d); return bp(rng.standard_normal(len(tt)),2000,5200)*np.exp(-tt*160)
save("tick", tick())
def pluck(freq=392, d=0.5):
    n=int(SR*d); N=int(SR/freq); buf=rng.uniform(-1,1,N); buf=lp(buf,3500)[:N]; out=np.zeros(n)
    for i in range(n):
        out[i]=buf[i%N]; buf[i%N]=0.5*(buf[i%N]+buf[(i+1)%N])*0.996
    return lp(out*env(n,0.002,0.2),4500)
save("pluck", pluck(392,0.5)); save("pluck_hi", pluck(523,0.45))
def chime(f=880,d=0.7):
    tt=t(d); mod=np.sin(2*np.pi*f*1.41*tt)*np.exp(-tt*9)*1.6
    x=np.sin(2*np.pi*f*tt+mod)*np.exp(-tt*5.5)+0.35*np.sin(2*np.pi*f*2.01*tt)*np.exp(-tt*9)
    return lp(x,5200)*env(len(tt),0.003,0.15)
save("chime", chime(784,0.75)); save("chime_soft", chime(660,0.6))
def thump(d=0.32):
    tt=t(d); f=110*np.exp(-tt*10)+58
    x=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*13)
    x+=bp(rng.standard_normal(len(tt)),300,1800)*np.exp(-tt*60)*0.25; return lp(x,1800)
save("impact_soft", thump())
def stamp():
    x=thump(0.26)*0.9; tt=t(0.26); x+=bp(rng.standard_normal(len(tt)),800,3000)*np.exp(-tt*80)*0.3; return x
save("stamp", stamp())
def sparkle(d=0.55):
    tt=t(d); out=np.zeros(len(tt))
    for k,(f,s) in enumerate([(1046,0.0),(1318,0.07),(1568,0.13),(1976,0.2)]):
        i=int(s*SR); seg=np.sin(2*np.pi*f*tt[:len(tt)-i])*np.exp(-tt[:len(tt)-i]*14)*(0.8-0.12*k); out[i:]+=seg
    return lp(out,4800)
save("sparkle", sparkle())
def type_key():
    d=0.05; tt=t(d); return bp(rng.standard_normal(len(tt)),1800,4200)*np.exp(-tt*120)+0.3*np.sin(2*np.pi*240*tt)*np.exp(-tt*90)
save("type", type_key())
def coin(d=0.35):
    tt=t(d); x=np.sin(2*np.pi*988*tt)*np.exp(-tt*16)+0.6*np.sin(2*np.pi*1319*tt)*np.exp(-(tt-0.05).clip(0)*12)*(tt>0.05)
    return lp(x,4200)*env(len(tt),0.002,0.1)
save("coin", coin())
print("ok")
