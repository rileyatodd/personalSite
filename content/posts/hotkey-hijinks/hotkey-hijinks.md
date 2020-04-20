## Hotkey Hijinks

Even before I started programming I've always been a fan of hotkeys, whether in games or any other program like Excel. I remember spending hours agonizing over the ideal hotkey setup for each of my World of Warcraft characters. The reason hotkeys appealed to me so much was that they were efficient. I hated when I wanted to react to something quickly but the reaction I wanted wasn't already engrained in my muscle memory.

Now that I am a full time software engineer I feel even more justified in finding the perfect combination of keyboard layout and hotkeys. Spending 8 hours a day at a computer makes you yearn for more efficient ways to use it. When I first learned about vi/vim and how fast people could fly around a text file without their hands leaving the home row on the keyboard I knew I had to step my game up.

Initially I learned vim and I'm glad I did because it's installed everywhere and knowing how to use it proficiently is a super useful skill in my line of work. I had some complaints though. It wasn't intuitive, and even today I still find myself looking up cheatsheets when vim isn't behaving how I want. It also didn't translate to any other program that I typed in. I knew there had to be a better balance to be struck between raw power and usability, so I set out to hack together my own solution with the following goals:
- I must be able to move the cursor around without leaving the home row. I spend a lot of time on laptops and those arrow keys are horrible both because they are tiny and because they require me to move my hand away from all other useful keys.
- It must be intuitive. I should be able to explain how to use my set up to a non-technical person in under a minute.
- It had to be application agnostic. I wanted to be able to move the cursor around in *any* program I was using, not just my IDE of choice.

With these goals in mind I very quickly came to the conclusion that a good minimal solution would be an extra modifier key, preferably reachable with my thumb, that when pressed would change some of the letter keys to arrow keys.

The setup I landed on was remapping just the *right* command key (I'm on a mac) to this new modifier. Luckily this is possible and meant I could leave the left command key alone so it would continue to function in it's normal capacity and I wouldn't break all the other hotkeys that use it. While the right command key is pressed, `i`,`j`,`k`, and `l` function as arrow keys much like `w`, `a`, `s`, `d` in many games.

This setup allows me to move all around most programs without moving my hands off the home row. Helpful things to remember are that on a mac by default holding command (in this case left command) while moving the cursor makes it jump to the beginning/end of the line, and holding `alt` makes the cursor jump word by word.

I used the wonderful tool [Karabiner](https://pqrs.org/osx/karabiner/) for remapping my macbook's keys (note: this tool doesn't quite work yet on Sierra unfortunately.) You can find the configuration file I used for this [here](/misc/karabiner-config.xml) if you want to give this setup a whirl.

In the end I met all my stated goals although it is not platform agnostic (I couldn't get a similar mapping to work in windows using AutoHotkey.) However, by remapping things at a hardware level it is possible to get this working without any custom software like Karabiner and on any platform! All you need is a keyboard that supports firmware level remapping and layers. I happen to absolutely LOVE my [ergodox-ez](https://ergodox-ez.com) which has open source firmware, and you can check out my configuration for that and modify it in a user friendly graphical ui [here](http://configure.ergodox-ez.com/keyboard_layouts/kdvale/)
