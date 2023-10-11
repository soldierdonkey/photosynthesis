mouseX = 0
mouseY = 0
mouseDown = false
document.body.addEventListener("mousedown", () => {
    mouseDown = true
})
document.body.addEventListener("mouseup", () => {
    mouseDown = false
})
document.getElementById("game1").addEventListener("mousemove", e => {
    mouseX = e.clientX
    mouseY = e.clientY
})
document.getElementById("game2").addEventListener("mousemove", e => {
    mouseX = e.clientX
    mouseY = e.clientY
})
setState = state => {
    document.getElementById("main1").hidden = true
    document.getElementById("main2").hidden = true
    document.getElementById("main3").hidden = true
    document.getElementById("main4").hidden = true
    document.getElementById("main"+state).hidden = false
    if(state == 3) {
        setTimeout(() => {
            CO2[0].update()
            CO2[1].update()
            CO2[2].update()
            RuBP2[0].update()
            RuBP2[1].update()
            RuBP2[2].update()
            NADPH[0].update()
            NADPH[1].update()
            NADPH[2].update()
            NADPH[3].update()
            NADPH[4].update()
            NADPH[5].update()
            ATP[0].update()
            ATP[1].update()
            ATP[2].update()
            ATP[3].update()
            ATP[4].update()
            ATP[5].update()
            RuBisCo.update()
            Return.update()
            Gluc.update()
            Recycle.update()
        }, 10)
    }
}
drag = sprite => {
    document.body.addEventListener("mousemove", () => {
        if(sprite.active) {
            sprite.x = Math.max(Math.min(mouseX, sprite.maxx), sprite.minx)-1
            sprite.y = Math.max(Math.min(mouseY, sprite.maxy), sprite.miny)-1
        }
    })
}
dragY = sprite => {
    document.body.addEventListener("mousemove", () => {
        if(sprite.active) {
            sprite.y = Math.max(Math.min(mouseY, sprite.maxy), sprite.miny)-1
        }
    })
}
dragX = sprite => {
    document.body.addEventListener("mousemove", () => {
        if(sprite.active) {
            sprite.x = Math.max(Math.min(mouseX, sprite.maxx), sprite.minx)-1
        }
    })
}
class Sprite {
    constructor (id) {
        this.width = document.getElementById(id).offsetWidth
        this.height = document.getElementById(id).offsetHeight
        this.id = id
        this.active = false
        this.maxx = 1040
        this.maxy = 585
        this.minx = 0
        this.miny = 0
        this._x = document.getElementById(id).style.left,
        this._y = document.getElementById(id).style.top,
        this.click = fn => document.getElementById(id).addEventListener("click", fn);
        this.mouseover = fn => document.getElementById(id).addEventListener("mouseover", fn);
        this.mousemove = fn => document.getElementById(id).addEventListener("mousemove", fn);
        this.mousedown = fn => document.getElementById(id).addEventListener("mousedown", fn);
        this.mouseup = fn => document.getElementById(id).addEventListener("mouseup", fn);
        setTimeout(() => {
            
            this.mousedown(() => {
                this.active = true
                console.log("up")
            })
            this.mouseup(() => {
                this.active = false
                console.log("down")
            })
        }, 0)

    }
    get x() {
        return this._x
    }
    set x(n) {
        this._x = n
        document.getElementById(this.id).style.left = n+"px"
    }
    get y() {
        return this._y
    }
    set y(n) {
        this._y = n
        document.getElementById(this.id).style.top = n+"px"
    }
    kill() {
        document.getElementById(this.id).remove()
        for(let i in this) {
            delete this[i]
        }
    }
    update() {
        this.width = document.getElementById(this.id).offsetWidth
        this.height = document.getElementById(this.id).offsetHeight
        this.x = parseInt(this.x)
        this.y = parseInt(this.y)
    }
}
createSprite = (parent, id, type, x, y) => {
    let tmp = document.createElement("div")
    tmp.classList.add(type)
    tmp.id = id
    tmp.style.top = y+"px"
    tmp.style.left = x+"px"
    document.getElementById(parent).appendChild(tmp)
    return new Sprite(id)
}
collision = (a, b) => {
    // console.log(a.x, a.width, b.x, b.width)
    if(a.x + a.width >= b.x && a.x <= b.x + b.width) {
        if(a.y + a.height >= b.y && a.y <= b.y + b.height) {
            return true
        }
    }
    return false
}
//Phase 2
document.getElementById("start").onclick = () => {
    initial = (new Date()).getTime()
    setInterval(() => {
        if(!timerstop) {
            curtime = (new Date()).getTime()-initial
        }
        let ms = Math.floor(curtime.toFixed(1)%1000)
        let seconds = Math.floor((curtime / 1000)%60)
        let minutes = Math.floor((curtime / (1000 * 60))%60)
        let hours = Math.floor((curtime / (1000 * 60 * 60))%24)
        let days = Math.floor((curtime / (1000 * 60 * 60 * 24)))
        let text = `${days} ${days == 1 ? "day" : "days"}, ${hours} ${hours == 1 ? "hour" : "hours"}, ${minutes} ${minutes == 1 ? "minute" : "minutes"}, ${seconds}.${ms} ${(seconds == 1 && ms == 0) ? "second" : "seconds"}.`
        document.getElementById("timer").innerText = text
    }, 1)
    setState(2)
    Photo2.update()
    Photo1.update()
    Synthase.update()
    Transport1.update()
    Tube.update()
    Transport2.update()
    Transport3.update()
    Photon1.update()
    Photon2.update()
    E1.update()
    E2.update()
    H1.update()
    H2.update()
    ADP1[0].update()
    ADP1[1].update()
    ADP1[2].update()
    NADP1[0].update()
    NADP1[1].update()
    Send.update()
}
Photo2 = new Sprite("photo2")
Photo1 = new Sprite("photo1")
Synthase = new Sprite("synthase")
Transport1 = new Sprite("transport1")
Tube = new Sprite("tube")
Transport2 = new Sprite("transport2")
Transport3 = new Sprite("transport3")
Photon1 = new Sprite("photon1")
Photon2 = new Sprite("photon2")
E1 = new Sprite("E-1")
E2 = new Sprite("E-2")
H1 = new Sprite("H+1")
H2 = new Sprite("H+2")
H2O1 = new Sprite("H2O1")
H2O2 = new Sprite("H2O2")
ATP = []
ADP1 = []
ADP1[0] = new Sprite("ADP1")
ADP1[1] = new Sprite("ADP2")
ADP1[2] = new Sprite("ADP3")
NADP1 = []
NADP1[0] = new Sprite("NADP+1")
NADP1[1] = new Sprite("NADP+2")
NADPH1 = []
Send = new Sprite("send")
game1 = new Sprite("game1")
Photon1.miny = 50
dragY(Photon1)
H1moved = false
H2moved = false
H2O2killed = false
E1X = 0
E1Y = 0
E2X = 0
E2Y = 0
H1m = false
H2m = false
H3m = false
H4m = false
Emoved = false
NADPtouch = false
ATPcount = 0
NADPHcount = 0
Hcount = 0
game1.mousemove(() => {
    if(collision(H1, Synthase) && !H1m && !Hcount == 2) {
        Synthase1()
        H1m = true
        Hcount += 1
    }
    if(collision(H2, Synthase) && !H2m && !Hcount == 2) {
        Synthase2()
        H2m = true
        Hcount += 1
    }
    if(H2O2killed){
        if(collision(H3, Synthase) && !H3m && !Hcount == 2) {
            Synthase3()
            H3m = true
            Hcount += 1
        }
        if(collision(H4, Synthase) && !H4m && !Hcount == 2) {
            Synthase4()
            H4m = true
            Hcount += 1
        }
    }

    if(collision(Photo2, Photon1)) {
        Photon1.kill()
        E1.minx = 174
        E2.minx = 174
        E1.maxx = 380
        E2.maxx = 380
        dragX(E1)
        dragX(E2)
    }
    if(collision(Photo1, E1) && collision(Photo1, E2) && !Emoved) {
        Emoved = true
        E21 = createSprite("game1", "E-1", "E-", E1.x, E1.y)
        E22 = createSprite("game1", "E-2", "E-", E2.x, E2.y)
        E21.update()
        E22.update()
        E1X = (540-E21.x)/100
        E1Y = (257-E21.y)/100
        E2X = (580-E22.x)/100
        E2Y = (257-E22.y)/100   
        E1.kill()
        E2.kill()
        E1move()
        E2move()
        dragY(Photon2)
        Photon2.miny = 125
    }
    if(collision(Photo1, Photon2) && Emoved) {
        Photon2.kill()
        E21.minx = 520
        E22.minx = 520
        E21.maxx = 684
        E22.maxx = 684
        dragX(E21)
        dragX(E22)
        NADP1[0].maxy = 147
        NADP1[1].maxy = 147
        drag(NADP1[0])
        drag(NADP1[1])
    }
    if(collision(NADP1[0], Transport3) && collision(NADP1[1], Transport3)) {
        NADP1[0].maxy = NADP1[0].y
        NADP1[0].maxx = NADP1[0].x
        NADP1[0].miny = NADP1[0].y
        NADP1[0].minx = NADP1[0].x
        NADP1[1].maxy = NADP1[1].y
        NADP1[1].maxx = NADP1[1].x
        NADP1[1].miny = NADP1[1].y
        NADP1[1].minx = NADP1[1].x
        E21.minx = 629
        E22.minx = 629
        E21.maxx = 684
        E22.maxx = 684
        E21.miny = 210
        E22.miny = 210
        E21.maxy = 274
        E22.maxy = 274
        dragY(E21)
        dragY(E22)
        NADPtouch = true
    }
    if(NADPtouch) {
        if(collision(NADP1[0], E21)) {
            E21.kill()
            let a = createSprite("game1", "NADPH11", "NADPH", NADP1[0].x, NADP1[0].y)
            a.mousemove(() => {
                if(collision(a, Send)) {
                    a.kill()
                    NADPHcount+=1
                    if(NADPHcount == 2 && ATPcount == 2) {
                        setState(3)
                    }
                }
            })
            drag(a)
            a.maxy = 147
            NADPH1[0] = a
            NADP1[0].kill()
        }
        if(collision(NADP1[0], E22)) {
            E22.kill()
            let a = createSprite("game1", "NADPH11", "NADPH", NADP1[0].x, NADP1[0].y)
            a.mousemove(() => {
                if(collision(a, Send)) {
                    a.kill()
                    NADPHcount+=1
                    if(NADPHcount == 2 && ATPcount == 2) {
                        setState(3)
                    }
                }
            })
            drag(a)
            a.maxy = 147
            NADPH1[0] = a
            NADP1[0].kill()
        }
        if(collision(NADP1[1], E21)) {
            E21.kill()
            let a = createSprite("game1", "NADPH12", "NADPH", NADP1[1].x, NADP1[1].y)
            a.mousemove(() => {
                if(collision(a, Send)) {
                    a.kill()
                    NADPHcount+=1
                    if(NADPHcount == 2 && ATPcount == 2) {
                        setState(3)
                    }
                }
            })
            drag(a)
            a.maxy = 147
            NADPH1[1] = a
            NADP1[1].kill()
        }
        if(collision(NADP1[1], E22)) {
            E22.kill()
            let a = createSprite("game1", "NADPH12", "NADPH", NADP1[1].x, NADP1[1].y)
            a.mousemove(() => {
                if(collision(a, Send)) {
                    a.kill()
                    NADPHcount+=1
                    if(NADPHcount == 2 && ATPcount == 2) {
                        setState(3)
                    }
                }
            })
            drag(a)
            a.maxy = 147
            NADPH1[1] = a
            NADP1[1].kill()
        }
    }
    if(collision(Tube, E1) && collision(Tube, E2) && !H1moved && !H2moved && !H2O2killed) {
        H2O2.kill()
        H2O2killed = true
        E3 = createSprite("game1", "E-3", "E-", 180, 440)
        E4 = createSprite("game1", "E-4", "E-", 260, 440)
        H3 = createSprite("game1", "H+3", "H", 175, 440)
        H4 = createSprite("game1", "H+4", "H", 250, 440)
        drag(H3)
        H3.miny = 375
        drag(H4)
        H4.miny = 375
        O1 = createSprite("game1", "O1", "O", 210, 400)
        E3.update()
        E4.update()
        H3.update()
        H4.update()
        O1.update()
        E3move()
        E4move()
        E1.minx = 370
        E2.minx = 370
        E1.maxx = 390
        E2.maxx = 390
        E1.miny = 230
        E2.miny = 230
        E1.maxy = 345
        E2.maxy = 345
        dragY(E1)
        dragY(E2)
    }
    if(E1.y > 340 && !H1moved) {
        E1.maxx = 600
        E1.maxy = 345
        E1.minx = 230
        E1.miny = 310
        H1moved = true
        H1ymove()
    }
    if(E2.y > 340 && !H2moved) {
        E2.maxx = 600
        E2.maxy = 345
        E2.minx = 230
        E2.miny = 310
        H2moved = true
        H2ymove()
    }
})
E1move = () => {setTimeout(() => {
    if(E21.y >= 260) {
        E21.y+=E1Y
        E21.x+=E1X
        E1move()
    }
    else {
    }
}, 10)}
E2move = () => {setTimeout(() => {
    if(E22.y >= 260) {
        E22.y+=E2Y
        E22.x+=E2X
        E2move()
    }
    else {
    }
}, 10)}
E3move = () => {setTimeout(() => {
    if(E3.y >= 260) {
        E3.y-=2.23
        E3.x-=0.05
        E3move()
    }
    else {
        E3.y = 257
        E3.x = 175
    }
}, 10)}
E4move = () => {setTimeout(() => {
    if(E4.y >= 260) {
        E4.y-=2.23
        E4.x-=0.5
        E4move()
    }
    else {
        E4.y = 257
        E4.x = 213
    }
}, 10)}
H1ymove = () => {setTimeout(() => {
    if(H1.y <= 500) {
        H1.y+=10
        H1ymove()
    }
    else {
        drag(H1)
        H1.miny = 375
    }
}, 10)}
H2ymove = () => {setTimeout(() => {
    if(H2.y <= 520) {
        H2.y+=10
        H2ymove()
    }
    else {
        drag(H2)
        H2.miny = 375
    }
}, 10)}
curADP = 0
ADP1X = 0
ADP1Y = 0
ADP2X = 0
ADP2Y = 0
ADP3X = 0
ADP3Y = 0
ADP4X = 0
ADP4Y = 0
Synthase1 = () => {
    if(curADP < 2) {
        H1.kill()
        H1 = createSprite("game1", "H+1", "H", 850, 374)
        H1.update()
        ADP1X = (850-ADP1[curADP].x)/100
        ADP1Y = (140-ADP1[curADP].y)/100
        SynthaseMove1()
    }
}
Synthase2 = () => {
    if(curADP < 2) {
        H2.kill()
        H2 = createSprite("game1", "H+2", "H", 850, 374)
        H2.update()
        ADP2X = (850-ADP1[curADP].x)/100
        ADP2Y = (140-ADP1[curADP].y)/100
        SynthaseMove2()
    }
}
Synthase3 = () => {
    if(curADP < 2) {
        H3.kill()
        H3 = createSprite("game1", "H+3", "H", 850, 374)
        H3.update()
        ADP3X = (850-ADP1[curADP].x)/100
        ADP3Y = (140-ADP1[curADP].y)/100
        SynthaseMove3()
    }
}
Synthase4 = () => {
    if(curADP < 2) {
        H4.kill()
        H4 = createSprite("game1", "H+4", "H", 850, 374)
        H4.update()
        ADP4X = (850-ADP1[curADP].x)/100
        ADP4Y = (140-ADP1[curADP].y)/100
        SynthaseMove4()
    }
}
SynthaseMove1 = () => {
    setTimeout(() => {
        if(H1.y > 70) {
            H1.y-=1
            console.log("hi")
            if(H1.y < 170) {
                ADP1[curADP].x += ADP1X
                ADP1[curADP].y += ADP1Y
            }
            SynthaseMove1()
        }
        else {
            curADP += 1
            let a = createSprite("game1", "ATP"+curADP, "ATP", ADP1[curADP-1].x, ADP1[curADP-1].y)
            a.mousemove(() => {
                if(collision(a, Send)) {
                    a.kill()
                    ATPcount+=1
                    if(NADPHcount == 2 && ATPcount == 2) {
                        setState(3)
                    }
                }
            })
            a.maxy = 174
            drag(a)
            ATP.push(a)
            ADP1[curADP-1].kill()
        }
    }, 10)
}
SynthaseMove2 = () => {
    setTimeout(() => {
        if(H2.y > 60) {
            H2.y-=1
            if(H2.y < 160) {
                ADP1[curADP].x += ADP2X
                ADP1[curADP].y += ADP2Y
            }
            SynthaseMove2()
        }
        else {
            curADP += 1
            let a = createSprite("game1", "ATP"+curADP, "ATP", ADP1[curADP-1].x, ADP1[curADP-1].y)
            a.mousemove(() => {
                if(collision(a, Send)) {
                    a.kill()
                    ATPcount+=1
                    if(NADPHcount == 2 && ATPcount == 2) {
                        setState(3)
                    }
                }
            })
            a.maxy = 174
            drag(a)
            ATP.push(a)
            ADP1[curADP-1].kill()
        }
    }, 10)
}
SynthaseMove3 = () => {
    setTimeout(() => {
        if(H3.y > 80) {
            H3.y-=1
            if(H3.y < 180) {
                ADP1[curADP].x += ADP3X
                ADP1[curADP].y += ADP3Y
            }
            SynthaseMove3()
        }
        else {
            curADP += 1
            let a = createSprite("game1", "ATP"+curADP, "ATP", ADP1[curADP-1].x, ADP1[curADP-1].y)
            a.mousemove(() => {
                if(collision(a, Send)) {
                    a.kill()
                    ATPcount+=1
                    if(NADPHcount == 2 && ATPcount == 2) {
                        setState(3)
                    }
                }
            })
            a.maxy = 174
            drag(a)
            ATP.push(a)
            ADP1[curADP-1].kill()
        }
    }, 10)
}
SynthaseMove4 = () => {
    setTimeout(() => {
        if(H4.y > 90) {
            H4.y-=1
            if(H4.y < 190) {
                ADP1[curADP].x += ADP4X
                ADP1[curADP].y += ADP4Y
            }
            SynthaseMove4()
        }
        else {
            curADP += 1
            let a = createSprite("game1", "ATP"+curADP, "ATP", ADP1[curADP-1].x, ADP1[curADP-1].y)
            a.mousemove(() => {
                if(collision(a, Send)) {
                    a.kill()
                    ATPcount+=1
                    if(NADPHcount == 2 && ATPcount == 2) {
                        setState(3)
                    }
                }
            })
            a.maxy = 174
            drag(a)
            ATP.push(a)
            ADP1[curADP-1].kill()
        }
    }, 10)
}
//Phase 3
//Sprites
CO2 = []
RuBP2 = []
NADPH = []
NADP = []
ATP = []
ADP = []
PGA = []
G3P = []
CO2[0] = new Sprite("CO21")
CO2[1] = new Sprite("CO22")
CO2[2] = new Sprite("CO23")
RuBP2[0] = new Sprite("RuBP21")
RuBP2[1] = new Sprite("RuBP22")
RuBP2[2] = new Sprite("RuBP23")
NADPH[0] = new Sprite("NADPH21")
NADPH[1] = new Sprite("NADPH22")
NADPH[2] = new Sprite("NADPH23")
NADPH[3] = new Sprite("NADPH24")
NADPH[4] = new Sprite("NADPH25")
NADPH[5] = new Sprite("NADPH26")
ATP[0] = new Sprite("ATP21")
ATP[1] = new Sprite("ATP22")
ATP[2] = new Sprite("ATP23")
ATP[3] = new Sprite("ATP24")
ATP[4] = new Sprite("ATP25")
ATP[5] = new Sprite("ATP26")
O2 = []
RuBisCo = new Sprite("rubisco")
Return = new Sprite("return")
Gluc = new Sprite("gluc")
Recycle = new Sprite("recycle")
Returncount = 0
Gluccount = 0
RuBPcount = 0
Recyclecount = 0
drag(RuBP2[0])
drag(RuBP2[1])
drag(RuBP2[2])
drag(CO2[0])
drag(CO2[1])
drag(CO2[2])
PGAcount = 1
G3Pcount = 1
for(let k of CO2) {
    k.mousemove(() => {
        for(let i of CO2) {
            for(let j of RuBP2) {
                if(i&&j){
                    if(collision(i, j) && (collision(i, RuBisCo) || collision(j, RuBisCo))) {
                        console.log(i, j)
                        i.kill()
                        j.kill()
                        delete i
                        delete j
                        let a = null
                        n = createSprite("game2", `O2${PGAcount}`, "O2", 825+Math.floor(Math.random()*100), Math.floor(Math.random()*100))
                        drag(n)
                        O2.push(n)
                        for(let u = 0; u < 2; u++) {
                            a = createSprite("game2", `PGA${PGAcount}`, "PGA", 850+Math.floor(Math.random()*50), 25+Math.floor(Math.random()*50))
                            drag(a)
                            a.mousemove(() => {
                                for(let h of PGA) {
                                    for(let m = 0; m < 6; m++) {
                                        if(NADPH[m]&&ATP[m]) {
                                            if(collision(h, NADPH[m]) && collision(h, ATP[m])) {
                                                let b = createSprite("game2", `G3P${G3Pcount}`, "G3P", h.x+Math.floor(Math.random()*50)-25, h.y+Math.floor(Math.random()*50)-25)
                                                b.mousemove(() => {
                                                    if(collision(b, Gluc) && Gluccount == 0) {
                                                        b.kill()
                                                        Glucmove()
                                                        Gluccount+=1
                                                    }
                                                    if(collision(b, Recycle) && Recyclecount != 5) {
                                                        b.kill()
                                                        Recyclecount+=1
                                                    }
                                                    if(Recyclecount == 5 && RuBPcount != 3) {
                                                        RuBPcount = 3
                                                        createSprite("game2", `cosmetic`, "RuBP", 250+Math.floor(Math.random()*100), 50+Math.floor(Math.random()*100))
                                                        createSprite("game2", `cosmetic`, "RuBP", 250+Math.floor(Math.random()*100), 50+Math.floor(Math.random()*100))
                                                        createSprite("game2", `cosmetic`, "RuBP", 250+Math.floor(Math.random()*100), 50+Math.floor(Math.random()*100))
                                                    }
                                                    if(Returncount == 12 && Gluccount == 1 && RuBPcount == 3) {
                                                        setTimeout(() => {setState(4)}, 900)
                                                        timerstop = true
                                                    }
                                                })
                                                G3P.push(b)
                                                G3Pcount++
                                                drag(b)
                                                h.kill()
                                                let c = createSprite("game2", `NADP+2${m+1}`, "NADP", NADPH[m].x+Math.floor(Math.random()*50)-25, NADPH[m].y+Math.floor(Math.random()*50)-25)
                                                drag(c)
                                                c.mousemove(() => {
                                                    if(collision(c, Return)) {
                                                        c.kill()
                                                        Returncount+=1
                                                        if(Returncount == 12) {
                                                            Returnmove()
                                                        }
                                                        if(Returncount == 12 && Gluccount == 1 && RuBPcount == 3) {
                                                            setTimeout(() => {setState(4)}, 900)
                                                            timerstop = true
                                                        }
                                                    }
                                                })
                                                NADP.push(c)
                                                NADPH[m].kill()
                                                let d = createSprite("game2", `ADP2${m+1}`, "ADP", ATP[m].x+Math.floor(Math.random()*50)-25, ATP[m].y+Math.floor(Math.random()*50)-25)
                                                drag(d)
                                                d.mousemove(() => {
                                                    if(collision(d, Return)) {
                                                        d.kill()
                                                        Returncount+=1
                                                        if(Returncount == 12) {
                                                            Returnmove()
                                                        }
                                                        if(Returncount == 12 && Gluccount == 1 && RuBPcount == 3) {
                                                            setTimeout(() => {setState(4)}, 900)
                                                            timerstop = true
                                                        }
                                                    }
                                                })
                                                ADP.push(d) 
                                                ATP[m].kill()
                                            }
                                        }
                                    }
                                }
                            })
                            PGA.push(a)
                            PGAcount++
                        }
                    }
                }
            }
        }
    })
}
timerstop = false
curtime = 0
Returnmove = () => {setTimeout(() => {
    if(Return.y >= -300) {
        Return.y-=1
        Returnmove()
    }
}, 10)}
Glucmove = () => {setTimeout(() => {
    if(Gluc.x >= -300) {
        Gluc.x-=1
        Glucmove()
    }
}, 10)}
