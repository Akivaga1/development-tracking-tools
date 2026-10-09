from django.contrib import admin
from .models import PersonalGoal, Habit, HabitLog, KPI, DailyEntry


@admin.register(PersonalGoal)
class PersonalGoalAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'category', 'priority', 'status', 'progress', 'target_date']
    list_filter = ['category', 'priority', 'status']
    search_fields = ['title', 'user__email']


@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'frequency', 'current_streak', 'longest_streak', 'is_active']
    list_filter = ['frequency', 'is_active']
    search_fields = ['name', 'user__email']


@admin.register(KPI)
class KPIAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'unit', 'current_value', 'target_value', 'is_active']
    list_filter = ['unit', 'frequency', 'is_active']
    search_fields = ['name', 'user__email']


admin.site.register(HabitLog)
admin.site.register(DailyEntry)
