$(document).ready(function() {
	
				
				var BTCbalance=0;
				var STEEMbalance=0;
				var USDtoPLN=0;
				var BTCtoUSD=0;
				var SBDtoUSD=0;
				var show="BTC";
				var hearasePriceUSD=100000;//YES FUCKING 100K OF GREEN MONEY.
				var thinkpadPricePLN=300;
				var lastSteem=0;
				var lastBTC=0;
				var lastPLN=0;
				var lastUSD=0;
				var lastHerase=0;
				var lastThinkpad=0;
				//data update interval
				setInterval(function(){
				
				if(BTCbalance>lastBTC)
				{
					new Audio('./claw.wav').play()
				}
				if(STEEMbalance>lastSteem)
				{
					new Audio('./mario.wav').play();
				}
				lastBTC=BTCbalance;
				lastSteem=STEEMbalance;
				lastUSD=Number(BTCbalance*BTCtoUSD).toFixed(2);
				lastPLN=Number(STEEMbalance*SBDtoUSD*USDtoPLN).toFixed(2);
				lastHerase=BTCbalance*BTCtoUSD*100/hearasePriceUSD;
				lastThinkpad=STEEMbalance*SBDtoUSD*USDtoPLN*100/thinkpadPricePLN;
				//USDtoPLN
				$.get('http://api.nbp.pl/api/exchangerates/tables/A?format=json', function(data)
					{
					USDtoPLN=data[0].rates.filter(function(element)
						{
							return (element.code=="USD");
						})[0].mid;
					}
				);
				//BTCbalance
				$.get('https://blockexplorer.com/api/addr/1BvZvk1DedHnsiJfQygWh48S1JojFvQiv5',function(data)
						{
							BTCbalance=data["balance"];
						}
					);
				//BTCtoUSD
				//BTCtoPLN	
				$.get('https://blockchain.info/pl/ticker',function(data)
				{
					BTCtoUSD=data.USD.last;
					BTCtoPLN=data.PLN.last;
				});	
				//SBDtoUSD
				$.get('https://api.coinmarketcap.com/v1/ticker/steem-dollars/',function(data)
				{
					SBDtoUSD=data[0].price_usd;
				}
				);
				//STEEMbalance
				$.get("https://webapi.steemdata.com/Accounts?where=name==wytrzeszcz",function(data)
						{
						STEEMbalance=data._items[0].balances.total.SBD;
						}, "json"
					);	
					
					
				


					
					},10*1000);
					
				setInterval(function()
				{
					if(show=="BTC")
					{
					
					
						$('#shadow').attr('src',"./herase-shadow.png");
						$('#goal').attr('src',"./herase.png");
						if(lastBTC<BTCbalance) $('#crypto').css('color','green');
						if(lastBTC==BTCbalance) $('#crypto').css('color','yellow');
						if(lastBTC>BTCbalance) $('#crypto').css('color','red');
						$('#crypto').text(BTCbalance+" BTC ");
						if(lastUSD<Number((BTCbalance*BTCtoUSD).toFixed(2))) $('#fiat').css('color','green');
						if(lastUSD==Number((BTCbalance*BTCtoUSD).toFixed(2))) $('#fiat').css('color','yellow');
						if(lastUSD>Number((BTCbalance*BTCtoUSD).toFixed(2))) $('#fiat').css('color','red');
						$('#fiat').text(Number((BTCbalance*BTCtoUSD).toFixed(2))+" USD");
						t=BTCbalance*BTCtoUSD*100;
						t=t/hearasePriceUSD;
						if(lastHerase<t) $('#procent').css('color','green');
						if(lastHerase==t) $('#procent').css('color','yellow');
						if(lastHerase>t) $('#procent').css('color','red');
						$('#procent').text((t).toFixed(4)+"%");
						if(t<100) t=100-t;
						else t=100;
						$('#goal').css("clip-path", "polygon(0% 100%, 100% 100%, 100% "+t+"%, 0% "+t+"%)");
						show="SBD";
					}else
					{
					
						$('#shadow').attr('src',"./ibm-shadow.png");
						$('#goal').attr('src',"./ibm.png"); // 350x141	
						$('#crypto').text(STEEMbalance+" SBD ");
						if(lastSteem<STEEMbalance) $('#crypto').css('color','green');
						if(lastSteem==STEEMbalance) $('#crypto').css('color','yellow');
						if(lastSteem>STEEMbalance) $('#crypto').css('color','red');
						$('#fiat').text(Number((STEEMbalance*SBDtoUSD*USDtoPLN).toFixed(2))+" PLN")
						if(lastPLN<Number((STEEMbalance*SBDtoUSD*USDtoPLN).toFixed(2))) $('#fiat').css('color','green');
						if(lastPLN==Number((STEEMbalance*SBDtoUSD*USDtoPLN).toFixed(2))) $('#fiat').css('color','yellow');
						if(lastPLN>Number((STEEMbalance*SBDtoUSD*USDtoPLN).toFixed(2))) $('#fiat').css('color','red');
						t=STEEMbalance*SBDtoUSD*USDtoPLN*100;
						t=t/thinkpadPricePLN;
						if(lastThinkpad<t) $('#procent').css('color','green');
						if(lastThinkpad==t) $('#procent').css('color','yellow');
						if(lastThinkpad>t) $('#procent').css('color','red');
						$('#procent').text((t).toFixed(4)+"%");
						if(t<100) t=100-t;
						else t=100;
						$('#goal').css("clip-path", "polygon(0% 100%, 100% 100%, 100% "+t+"%, 0% "+t+"%)");
						show="BTC";
					}
				},5000);
			});