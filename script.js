import data from './modules/db.js'
const cont = document.querySelector('.container')
const data_show = document.querySelector('[data-show]')
const data_showAll = document.querySelector('[data-showAll]')
const count = document.querySelector('.zero')
let openBtns = document.querySelectorAll('[data-menu-open]')
let closeBtns = document.querySelectorAll('[data-menu-close]')
let menu = document.querySelector('aside')
let cart_container = document.querySelector('.cart-container')
let orderBtn = document.querySelector(".btn-order")
let totalPrice = document.querySelector(".total")
let num = 0
let cart = []

openBtns.forEach(el => {
    el.onclick = () => {
        menu.style.right = "0px"
    }
})
closeBtns.forEach(el => {
    el.onclick = () => {
        menu.style.right = "-1000px"
    }
})

let btnRemoveClass;

count.innerHTML = cart.length
reload(data, cont)

function reload(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        //create element
        let box = document.createElement('div')
        let imgBox = document.createElement('div')
        let down = document.createElement('div')
        let h1 = document.createElement('h1')
        let p = document.createElement('p')
        let flex = document.createElement('div')
        let img = document.createElement('img')
        let dollarImg = document.createElement('img')
        let starImg = document.createElement('img')
        let korobkaImg = document.createElement('img')
        let dollar = document.createElement('p')
        let star = document.createElement('p')
        let korobka = document.createElement('p')
        let button = document.createElement('button')
        // src
        img.src = item.image
        dollarImg.src = `./img/dollar.png`
        starImg.src = `./img/star.png`
        korobkaImg.src = `./img/box.png`
        // innerHTML
        box.id = item.id
        h1.innerHTML = item.category
        p.innerHTML = item.description.slice(0, 150)
        dollar.innerHTML = `${item.price}$`
        star.innerHTML = item.rating.rate
        korobka.innerHTML = item.rating.count
        button.innerHTML = 'В Избранное'
        //classList
        box.classList.add('box')
        imgBox.classList.add('img')
        down.classList.add('downTxt')
        p.classList.add('info')
        h1.classList.add('h1')
        flex.classList.add('flex_')
        dollar.classList.add('boxTxt')
        star.classList.add('boxTxt')
        korobka.classList.add('boxTxt')
        button.classList.add('button')
        //append
        imgBox.append(img)
        flex.append(dollarImg, dollar, starImg, star, korobkaImg, korobka)
        down.append(h1, p, flex, button)
        box.append(imgBox, down)
        place.prepend(box)

        button.onclick = () => {
            proverka()
            totalPrice.innerHTML = num
            cart_reload(cart, cart_container)
        }
        function proverka () {
            if (!cart.includes(item.id)) {
                cart.push(item.id)
                button.classList.add('button_active')
                num += item.price
            } else {
                let idx = cart.indexOf(item.id)
                cart.splice(idx, 1)
                button.classList.remove('button_active')
                num -= item.price
            }
        }
        count.innerHTML = cart.length
    }
}

data_show.onclick = () => {
    reload(data.slice(0, 5), cont)
}
data_showAll.onclick = () => {
    reload(data, cont)
}

cart_reload(cart, cart_container)

function cart_reload(arr, place) {
    place.innerHTML = ""
    let temp = []

    for (let item of arr) {
        for (let elem of data) {
            if (item === elem.id) {
                elem.qt = 1
                temp.push(elem)
            }
        }
    }

    for (let item of temp) {
        let itemDiv = document.createElement('div')
        let leftDiv = document.createElement('div')
        let rightDiv = document.createElement('div')
        let img = document.createElement('img')
        let colDiv = document.createElement('div')
        let title = document.createElement('span')
        let category = document.createElement('span')
        let counterDiv = document.createElement('div')
        let btnPlus = document.createElement('button')
        let quantity = document.createElement('span')
        let btnMinus = document.createElement('button')
        let total = document.createElement('span')
        // a
        total.innerHTML = item.price
        btnMinus.innerHTML = "-"
        quantity.innerHTML = item.qt
        btnPlus.innerHTML = "+"
        img.src = item.image
        category.innerHTML = item.category
        title.innerHTML = item.title
        // b
        itemDiv.id = item.id
        itemDiv.classList.add("cart-item")
        leftDiv.classList.add("left")
        rightDiv.classList.add("right")
        colDiv.classList.add("col")
        title.classList.add("title")
        category.classList.add("categ")
        counterDiv.classList.add("counter")
        total.classList.add("total-price")
        // c
        itemDiv.append(leftDiv, rightDiv)
        leftDiv.append(img, colDiv)
        colDiv.append(title, category)
        rightDiv.append(counterDiv, total)
        counterDiv.append(btnPlus, quantity, btnMinus)
        place.append(itemDiv)
        let firstPrice = total.innerHTML
        // console.log
        // console.log(itemDiv.id);
        // console.log(item.id);
        // the end
        btnPlus.onclick = () => {
            item.qt++
            quantity.innerHTML = item.qt
            total.innerHTML = firstPrice * item.qt
            total.innerHTML = Number(total.innerHTML).toFixed(2)
            num += item.price
            totalPrice.innerHTML = num
        }

        btnMinus.onclick = () => {
            item.qt--
            if (item.qt === 0) {
                count.innerHTML--
                let idx = cart.indexOf(item.id)
                cart.splice(idx, 1)
                // if (itemDiv.id == item.id) {
                //     // let idxT = temp.indexOf(item)
                //     // console.log();
                //     // temp.splice(idxT, 1)
                // }
                itemDiv.remove();
            }
            quantity.innerHTML = item.qt
            total.innerHTML = firstPrice * item.qt
            total.innerHTML = Number(total.innerHTML).toFixed(2)
            num -= item.price
            totalPrice.innerHTML = num
        }
        count.innerHTML = temp.length
    }
}