import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

class cipher {
    // constructor
    constructor(alpha, action, key) {
        d3.select("#alpha").property("value", alpha);
        d3.select("#actionSelect").property("value", action);
        d3.select("#keyA").property("value", key.a);
        d3.select("#keyB").property("value", key.b);
        this .preKey = {
            a: 0,
            b: 0,
        }
        this.key = {
            a: key.a,
            b: key.b,
        }
        this.alphaUpdate();
        this.actionUpdate();
        this.keyUpdate();
    }

    // update key and elements based on alphabet change
    alphaUpdate() {
        this.alpha = d3.select("#alpha").property("value");
    }

    // update elements based on action selected
    actionUpdate() {
        this.action = d3.select("#actionSelect").property("value");
        if (this.action == "encrypt") {
            d3.select("#textLabel")
                .attr("class", null)
                .classed("plain", true)
                .text("PLaintext: ");
            d3.select("#action")
                .text("Encrypt");
            d3.select("#text")
                .attr("class", null)
                .classed("plain", true);
        } else if (this.action == "decrypt") {
            d3.select("#textLabel")
                .attr("class", null)
                .classed("cipher", true)
                .text("Ciphertext: ");
            d3.select("#action")
                .text("Decrypt");
            d3.select("#text")
                .attr("class", null)
                .classed("cipher", true);
        }
    }

    keyUpdate() {
        let curVal = {
            a: parseInt(d3.select("#keyA").property("value")),
            b: parseInt(d3.select("#keyB").property("value")),
        }
        if (isNaN(curVal.a)) {
            d3.select("#keyA").property("value", this.preKey.a);
        } else {
            this.preKey.a = this.key.a;
            this.key.a = curVal.a;
            d3.select("#keyA").property("value", curVal.a);
        }
        if (isNaN(curVal.b)) {
            d3.select("#keyB").property("value", this.preKey.b);
        } else {
            this.preKey.b = this.key.b;
            this.key.b = curVal.b;
            d3.select("#keyB").property("value", this.key.b);
        }
    }

    // perform encryption or decryption and report to screen
    cryption() {
        const text = d3.select("#text").property("value");
        fetch(window.location.origin+"/articleAPI/affineCipher?" + new URLSearchParams({
            alphabet: this.alpha,
            a: this.key.a,
            b: this.key.b,
            text: text,
            action: this.action
        }))
            .then(res => res.json())
            .then(data => {
                d3.select("#output p")
                    .remove();
                d3.select("#output")
                    .append("p")
                    .text(`${this.action == "encrypt" ? "Cipher" : "Plain"}text: ${data.text}`);
            });
    }
}

// main
d3.select("#text").property("value", "")
const ciph = new cipher("abcdefghijklmnopqrstuvwxyz", "encrypt", {a: 0, b: 0});
window.ciph = ciph;