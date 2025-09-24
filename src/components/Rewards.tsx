import { Gift, Star, Award, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const Rewards = () => {
  const userStats = {
    reportsSubmitted: 12,
    pointsEarned: 240,
    level: 'Community Contributor',
    nextLevelPoints: 260,
  };

  const rewards = [
    {
      id: 1,
      title: 'Coffee Voucher',
      description: 'Free coffee at local cafes',
      points: 50,
      available: true,
    },
    {
      id: 2,
      title: 'Public Transport Pass',
      description: 'Free day pass for buses and metro',
      points: 100,
      available: true,
    },
    {
      id: 3,
      title: 'Community Center Access',
      description: 'Free monthly access to community facilities',
      points: 150,
      available: true,
    },
    {
      id: 4,
      title: 'City Tour',
      description: 'Guided city tour for civic contributors',
      points: 300,
      available: false,
    },
  ];

  const achievements = [
    {
      title: 'First Reporter',
      description: 'Submitted your first complaint',
      earned: true,
    },
    {
      title: 'Community Helper',
      description: 'Submitted 10 complaints',
      earned: true,
    },
    {
      title: 'Local Hero',
      description: 'Submitted 25 complaints',
      earned: false,
    },
  ];

  return (
    <div className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Rewards & Recognition
        </CardTitle>
        <p className="text-muted-foreground">
          Earn points and rewards for contributing to your community.
        </p>
      </CardHeader>

      <CardContent className="px-0 space-y-6">
        {/* User Stats */}
        <Card className="bg-gradient-success text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Your Progress</h3>
                <p className="text-white/80">Level: {userStats.level}</p>
              </div>
              <Award className="w-8 h-8" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">{userStats.reportsSubmitted}</p>
                <p className="text-white/80 text-sm">Reports Submitted</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{userStats.pointsEarned}</p>
                <p className="text-white/80 text-sm">Points Earned</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress to next level</span>
                <span>{userStats.pointsEarned}/{userStats.nextLevelPoints}</span>
              </div>
              <div className="bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${(userStats.pointsEarned / userStats.nextLevelPoints) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Gift className="w-5 h-5 mr-2 text-primary" />
            Available Rewards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className={`border-border/50 ${!reward.available ? 'opacity-60' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{reward.title}</h4>
                    <Badge variant="outline">{reward.points} pts</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                  <Button 
                    size="sm" 
                    variant={reward.available ? "default" : "secondary"}
                    disabled={!reward.available || userStats.pointsEarned < reward.points}
                    className="w-full"
                  >
                    {reward.available 
                      ? userStats.pointsEarned >= reward.points 
                        ? 'Redeem' 
                        : 'Not enough points'
                      : 'Coming Soon'
                    }
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-primary" />
            Achievements
          </h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`border-border/50 ${achievement.earned ? 'bg-accent/30' : 'opacity-60'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold flex items-center">
                        {achievement.earned && <Star className="w-4 h-4 text-yellow-500 mr-1" />}
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Badge variant={achievement.earned ? "default" : "secondary"}>
                      {achievement.earned ? 'Earned' : 'Locked'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </div>
  );
};