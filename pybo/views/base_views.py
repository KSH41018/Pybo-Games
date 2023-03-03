from django.core.paginator import Paginator
from django.shortcuts import render, get_object_or_404
from django.db.models import Q

from ..models import Question, Game


def index(request):
    page = request.GET.get('page', '1')  # 페이지
    kw = request.GET.get('kw', '')  # 검색어
    question_list = Question.objects.order_by('-create_date')
    if kw:
        question_list = question_list.filter(
            Q(subject__icontains=kw) |  # 제목 검색
            Q(content__icontains=kw) |  # 내용 검색
            Q(answer__content__icontains=kw) |  # 답변 내용 검색
            Q(author__username__icontains=kw) |  # 질문 글쓴이 검색
            Q(answer__author__username__icontains=kw)  # 답변 글쓴이 검색
        ).distinct()
    paginator = Paginator(question_list, 10)  # 페이지당 10개씩 보여주기
    page_obj = paginator.get_page(page)
    context = {'question_list': page_obj, 'page': page, 'kw': kw}
    return render(request, 'pybo/question_list.html', context)


def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    context = {'question': question}
    return render(request, 'pybo/question_detail.html', context)

def game(request):
    game_list = Game.objects.order_by('content')
    context = {'game_list': game_list}
    return render(request, 'gameBox.html', context)

def three_Word_Relay(request):
    return render(request, "game/3word_relay.html")

def two_zero_four_eight(request):
    return render(request, "game/2048.html")

def Calculator(request):
    return render(request, "game/calculator.html")

def Card(request):
    return render(request, "game/card.html")

def Loto(request):
    return render(request, "game/loto.html")

def Mine(request):
    return render(request, "game/mine.html")

def Mole(request):
    return render(request, "game/mole.html")

def Number_BaseBall(request):
    return render(request, "game/number-baseball.html")

def Rock_Scissors_Paper(request):
    return render(request, "game/r_s_p.html")

def Reaction(request):
    return render(request, "game/reaction.html")

def Text_RPG(request):
    return render(request, "game/text-RPG.html")

def Tic_Tac_Toe(request):
    return render(request, "game/tictactoe.html")

def Word_Relay(request):
    return render(request, "game/word_relay.html")
