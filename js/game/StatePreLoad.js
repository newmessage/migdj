/**
 * hung.phamviet
 */
function StatePreLoad()
{
	var splash = null;
	var splash_button = null;
	var currency_icon = null;
	var MOBILE_X_OFFSET = 50;

	this.PreLoadData = function() 
    {
        StateLoading.LoadData();
        
        splash = new Object();
		splash.Load(SPLASH_LINK + HostImagePath() + "/bg/splash_bg.jpg");
        splash.SetPos(Graphic.width >> 1, Graphic.height >> 1);
		splash.SetAnchor(H_CENTER|V_CENTER);
		//No orientation if Android
		if (DEVICE_INFO.OS != DEVICE_OS.ANDROID)
		{
			splash.SetRotate(90);
		}
		
		splash_button = new Object();
		splash_button.Load(SPLASH_BTN_LINK + HostImagePath() + "/bg/splash_btn_"+ GAME_COUNTRY.language +".jpg");
        splash_button.SetPos(Graphic.width >> 1, Graphic.height >> 1);
		splash_button.SetAnchor(H_CENTER|V_CENTER);
		splash_button.SetPos(ScreenDefine.SPLASH.BUTTON_OFFSET_X + (MOBILE_X_OFFSET*7),
								(Graphic.height >> 1) + ScreenDefine.SPLASH.BUTTON_OFFSET_Y);
		//No orientation if Android
		if (DEVICE_INFO.OS == DEVICE_OS.ANDROID && !isPotraitMode)
		{
			splash_button.SetRotate(90);	
		}
		currency_icon = new Object();
		currency_icon.Load(CURRENCY_ICO_LINK + HostImagePath() + "/button/currency_icon_large.png");
		currency_icon.SetAnchor(H_CENTER|V_CENTER);
		//No orientation if Android
		if (DEVICE_INFO.OS == DEVICE_OS.ANDROID)
		{
			currency_icon.SetRotate(90);	
		}
		currency_icon.SetScale(2, 2);
	};
    
    this.Unload = function()
    {
        splash.Unload();
        splash = null;
        
        splash_button.Unload();
        splash_button = null;
        
        currency_icon.Unload();
        currency_icon = null;
    }
	
	this.Update = function(time)
	{
        //check when loading screen data is already
        if(Input.IsTouchUp())
        {
        	// area_id = 11699; //(_os=='ANDROID') ? 11699 : 11701;

        	// link = '';

        	//call_client(creative_id, 'GLADS_CLICK_INTERSTITIAL', 'click', 0, area_id, '', link);
            /* //Removing Intersistial
            if (!DEBUG)
            {
                call_client(creative_id, 'GLADS_CLICK_INTERSTITIAL', 'click', 0, 0, '', '');
            }
            */

        	console.log('Click Tracked');

            this.Unload();
            //Utility.Log("Pre load data successfull");
            GameCore.ChangeState(GAME_STATE_LOADING);
        }

        TopBar.Update();
	};
	
	this.Draw = function()
    {
    	var rotateText = true;

		if (DEVICE_INFO.OS == DEVICE_OS.ANDROID)
		{
		    MOBILE_X_OFFSET = 50;
		    rotateText = false;
		}
		console.log ("Screen::Device_OS("+DEVICE_INFO.OS+")");
			
		if(splash != null)
			splash.Draw();
		if(splash_button != null)
			splash_button.Draw();

		/* // YOYO : reward is removed, thus this also not being used anymore
		if (creative_type_id == 27 || creative_type_id == '27')
		{
			console.log ("creative_type_id : "+creative_type_id)
			if(currency_icon != null)
			{
				currency_icon.SetPos((Graphic.width >> 1)+ScreenDefine.SPLASH.CURRENCY_ICON_OFFSET_X, ScreenDefine.SPLASH.CURRENCY_ICON_OFFSET_Y + Graphic.GetTextWidth(GetText().SPLASH_TEXT_GET, ScreenDefine.FONT_SIZE_SPLASH));
				//currency_icon.Draw();
			}
            Graphic.DrawString(GetText().SPLASH_TEXT_PLAY, (Graphic.width >> 1) + ScreenDefine.SPLASH.TEXT_PLAY_OFFSET_X + MOBILE_X_OFFSET, ScreenDefine.SPLASH.TEXT_PLAY_OFFSET_Y, "#FFFFFF", ScreenDefine.FONT_SIZE_NORMAL, V_CENTER, NONE, true);
            Graphic.DrawString(GetText().SPLASH_TEXT_GET, Graphic.width >> 1, ScreenDefine.SPLASH.TEXT_PLAY_OFFSET_Y, "#FFFFFF", ScreenDefine.FONT_SIZE_SPLASH, V_CENTER, NONE, true);
		}
        else 
        */
        {
        	if (DEVICE_INFO.OS == DEVICE_OS.ANDROID)
        	{
        		Graphic.DrawString(GetText().SPLASH_TEXT_PLAY_NO_REWARD, (Graphic.width >> 1) + ScreenDefine.SPLASH.TEXT_PLAY_OFFSET_X - (MOBILE_X_OFFSET * 9), ScreenDefine.SPLASH.TEXT_PLAY_OFFSET_Y , "#FFFFFF", ScreenDefine.FONT_SIZE_NORMAL, V_CENTER, NONE, rotateText);
            	Graphic.DrawString(GetText().SPLASH_TEXT_GET_NO_REWARD, (Graphic.width >> 1) + ScreenDefine.SPLASH.TEXT_PLAY_OFFSET_X - (MOBILE_X_OFFSET * 9), ScreenDefine.SPLASH.TEXT_PLAY_OFFSET_Y + ScreenDefine.SPLASH.TEXT_PLAY_OFFSET_X  , "#FFFFFF", ScreenDefine.FONT_SIZE_SPLASH, V_CENTER, NONE, rotateText);
        	}
        	else
        	{

        		Graphic.DrawString(GetText().SPLASH_TEXT_PLAY_NO_REWARD, (Graphic.width >> 1) + ScreenDefine.SPLASH.TEXT_PLAY_OFFSET_X, ScreenDefine.SPLASH.TEXT_PLAY_OFFSET_Y, "#FFFFFF", ScreenDefine.FONT_SIZE_NORMAL, V_CENTER, NONE, rotateText);
            	Graphic.DrawString(GetText().SPLASH_TEXT_GET_NO_REWARD, Graphic.width >> 1, ScreenDefine.SPLASH.TEXT_PLAY_OFFSET_Y, "#FFFFFF", ScreenDefine.FONT_SIZE_SPLASH, V_CENTER, NONE, rotateText);
        	}
        }

		TopBar.Draw();
	};
}

var StatePreLoad = new StatePreLoad();