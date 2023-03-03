"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from pybo.views import base_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('pybo/', include('pybo.urls')),
    path('common/', include('common.urls')),
    path('', base_views.index, name='index'),  # '/' 에 해당되는 path

    # //////////////////////////////GAME URL/////////////////////////// #
    path('game/', base_views.game, name='game'),
    path('game/Word_Relay/', base_views.Word_Relay, name='Word_Relay'),
    path('game/three_Word_Relay', base_views.three_Word_Relay, name='three_Word_Relay'),
    path('game/2048', base_views.two_zero_four_eight, name='two_zero_four_eight'),
    path('game/Calculator', base_views.Calculator, name='Calculator'),
    path('game/Card', base_views.Card, name='Card'),
    path('game/Loto', base_views.Loto, name='Loto'),
    path('game/Mine', base_views.Mine, name='Mine'),
    path('game/Mole', base_views.Mole, name='Mole'),
    path('game/Number_BaseBall', base_views.Number_BaseBall, name='Number_BaseBall'),
    path('game/Rock_Scissors_Paper', base_views.Rock_Scissors_Paper, name='Rock_Scissors_Paper'),
    path('game/Reaction', base_views.Reaction, name='Reaction'),
    path('game/Text_RPG', base_views.Text_RPG, name='Text_RPG'),
    path('game/Tic_Tac_Toe', base_views.Tic_Tac_Toe, name='Tic_Tac_Toe'),

]
