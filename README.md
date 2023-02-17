# PayRate 
![github logo for payrate](https://user-images.githubusercontent.com/62097380/219632235-c0d592d5-2013-4cf9-bc4e-b0e1b9117d33.png)
<br>Building PayRate - A Simple Currency Converter Web App

## Introduction
In today's world, currency conversion is an essential task we all come across in our daily lives. To simplify this process, I created PayRate, a web app that quickly converts fiat currency to cryptocurrency rates and vice versa. In this post, I'll share how I built PayRate, its current features, drawbacks, and future scope.

## Features

PayRate is built using HTML, CSS, and JavaScript, making it a simple yet functional currency converter web app. The app is designed to be easy to use and can be bookmarked on your browser or mobile device for quick access. The conversion process is straightforward - simply select the currency you want to convert from, then select the currency you want to convert to, and click on the toggle button to get the conversion rate.

One unique feature of PayRate is its BitRate mode. By clicking on the toggle button, the user is taken to the BitRate mode where they can instantly convert between fiat and cryptocurrency rates. However, due to the volatility of cryptocurrencies, the conversion rate may vary slightly as the value does not dynamically change.

## Drawbacks
One major drawback of PayRate is that it is a static web app. To get the conversion rate, the user needs to click on the toggle button manually. This can be tedious if the user needs to convert multiple currencies in quick succession. Another drawback is that the conversion rate for cryptocurrency may not be entirely accurate due to the volatility of cryptocurrency values. Since the conversion rate is static, the rate may not reflect the actual value of the cryptocurrency at the time of conversion. One final drawback, while BitRate does conversions from Fiat to Cryptocurrency right away, It does not convert cryptocurrency to fiat currency as of right now. 

## Future Scope
To enhance PayRate's functionality and usability, there are several areas for improvement:

* Make the webpage dynamic, instantly displaying conversion rates as soon as the user inputs the value and chooses the desired currency to convert to.
* Implement Cryptocurrency to Fiat Currency conversion.
* Ensure that the cryptocurrency values display real-time conversion values to eliminate any variations in real-time prices.
* Implement graphs to show currency rate trends.
*Add the ability to see multiple currency rates at the same time.

## APIs Used
To build PayRate, I used two APIs - the exchangerate API and the cryptocompare API.

## Conclusion
I enjoyed building PayRate, and it was a great learning experience. The web app is a great tool for quick currency conversions, and the BitRate mode makes it even more versatile. While it has some limitations, I'm excited about the future scope of the project and hope to address its current drawbacks. Lastly, I'd like to give a huge shoutout to Aadithyen for assisting me with this project. Check out his GitHub page to see more cool projects: https://github.com/aadithyen.
