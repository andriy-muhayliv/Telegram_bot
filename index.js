
const TelegarmBot = require('node-telegram-bot-api');

const Token = 1; 

const bot = new TelegarmBot(Token, {polling: true});


//-------------//


const personDeliveryDetails = {
    storeAress : '',
    store : '',
    products : '',
    deliveryAdress : '',
    phoneNumber : '',
    comments : '',
    payment : false
}

let i = 0;


//---------------//


// Кнопки меню
const KB = {
    delivery : 'Хочу доставку',
    about : 'Як це працює?',
    main : 'Головне меню',
    payment : 'Так усе вірно, перейти до оплати.'

}

// Стартове привітання
bot.onText(/\/start/, msg => {

    let text = `Привіт ${msg.from.first_name}, Що бажаєш?`
    i=0;
    bot.sendMessage(msg.chat.id, text, {
        reply_markup: {
            keyboard: [
                [KB.delivery],
                [KB.about],
            ]
        }
    });
})

// Switch метод для меню
bot.on('message', msg => {

    

    switch (msg.text) {

        case 'send' :
        sContact(msg.chat.id)
        break
        case KB.payment : 
        metods.send(-1001274359457);
        bot.sendMessage(msg.from.id, '.', {reply_markup: {
            keyboard: [
                [KB.delivery],
                [KB.about],
            ]
        }})
        break
        case KB.delivery:
            metods.order(msg.from.id, msg)
            break
        case KB.about:
            metods.about(msg.from.id, msg.from.first_name)
            break
            case KB.forward :
            break
        case KB.main:
            bot.sendMessage(msg.chat.id, 'Головне Меню', {
                reply_markup: {
                    keyboard: [
                        [KB.delivery],
                        [KB.about],
                    ]
                }
            })
            break

    }

})

//  Введення інформації по доставці
bot.on('message', msg => {
    if (msg.text == KB.main) {
        i = 0;
        for (var key in personDeliveryDetails) {
            personDeliveryDetails[key] = null;
            personDeliveryDetails.payment = false;
          }
    }

if(i == 1) {
    i++
}else if (i == 2) {
    personDeliveryDetails.storeAress = msg.text;
    i++
    bot.sendMessage(msg.from.id, 'Вкажіть магазин, або місце (де будуть купуватись продукти, або де потрібно забрати що небудь.).');
}else if (i == 3) {
    personDeliveryDetails.store = msg.text;
    i++
    bot.sendMessage(msg.from.id, `Що саме ви хочете придбати в ${personDeliveryDetails.store} `);
}
else if ( i == 4) {
    personDeliveryDetails.products = msg.text;
    i++
    bot.sendMessage(msg.from.id, 'Вкажіть адресу доставки.');
} else if ( i == 5) {
    personDeliveryDetails.deliveryAdress = msg.text;
    i++
    bot.sendMessage(msg.from.id, 'Ваш номер телефону.');
}else if (i == 6) {
    personDeliveryDetails.phoneNumber = msg.text;
    i++
    bot.sendMessage(msg.from.id, 'Можете залишити коментар (Уточнити щоб вам зателефонували, або як вас знайти.)');
}else if ( i >= 7) {
    personDeliveryDetails.comments = msg.text;
    i++
    bot.sendMessage(msg.from.id, `Все вірно у вашому замовленні? \n\n Адреса продукту: ${personDeliveryDetails.storeAress} \n\n Магазин: ${personDeliveryDetails.store} \n\n Замовлення: ${personDeliveryDetails.products}\n\n Ваша адреса: ${personDeliveryDetails.deliveryAdress}\n\n Номер телефону: ${personDeliveryDetails.phoneNumber}\n\n Коментар: ${personDeliveryDetails.comments}\n\n Для відміни натисніть кнопку головне меню. `,
    {
        reply_markup: {
            keyboard: [
                [KB.payment],
                [KB.main]
            ]
        }
    })
    i = 0;
}
console.log(personDeliveryDetails);

})






// Фунуції 
const metods = {

    about: (chatId, userName) => {

        bot.sendMessage(chatId, `${userName}, покищо наші сови можуть доставити тобі щось з цілодобового супермаркета, аптеки, макдональдсу, або з любого закладу чи магазину де є оплата карткою!\n\n --Також ми можемо виконати доручення, наприклад ви забули у подруги ключі від дому, телефон, або іншу потрібну для вас річ, ми можемо вам її привезти.\n\n--Тільки не забувай що замовлення має бути не надто важким, адже наші совки не можуть літати з перегрузом!`,
            {
                reply_markup: {
                    keyboard: [
                        [KB.main]
                    ]
                }
            })
    },

    order: (orderId, msg) => {
        i++

        bot.sendMessage(orderId, 'Вкажіть звідки привезти вам щось? (Адреса)', {


            reply_markup: {
                keyboard: [
                    [KB.main]
                ]
            }
        })
    },

    send : (chatId) => {
        bot.sendMessage(chatId, `Адреса продукту: ${personDeliveryDetails.storeAress} \n\n Магазин: ${personDeliveryDetails.store} \n\n Замовлення: ${personDeliveryDetails.products}\n\n Ваша адреса: ${personDeliveryDetails.deliveryAdress}\n\n Номер телефону: ${personDeliveryDetails.phoneNumber} \n\n Коментар: ${personDeliveryDetails.comments}`,  
        {
            reply_markup: {
                inline_keyboard: [
                    [{text :'Прийняти замовлення', callback_data: '123'}]
                ]
            }
        });
    },

}

function sContact(id) {
}