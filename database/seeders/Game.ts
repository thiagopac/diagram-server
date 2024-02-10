import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Game from 'App/Models/Game'

export default class extends BaseSeeder {
  public async deactivated_run() {
    const uniqueKey = 'id'

    await Game.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        pgn: '1. d4 Nf6 2. Nf3 d5 3. e3 Bf5 4. c4 c6 5. Nc3 e6 6. Bd3 Bxd3 7. Qxd3 Nbd7 8. b3 Bd6 9. O-O O-O 10. Bb2 Qe7 11. Rad1 Rad8 12. Rfe1 dxc4 13. bxc4 e5 14. dxe5 Nxe5 15. Nxe5 Bxe5 16. Qe2 Rxd1 17. Rxd1 Rd8 18. Rxd8+ Qxd8 19. Qd1 Qxd1+ 20. Nxd1 Bxb2 21. Nxb2 b5 22. f3 Kf8 23. Kf2 Ke7 1/2-1/2',
        owner: 'monchal',
      },
      {
        id: 2,
        pgn: '1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4 5. Bc4 e6 6. O-O Nb6 7. Be2 Be7 8. h3 Bh5 9. Bf4 Nc6 10. c3 O-O 11. Nbd2 d5 12. b4 a5 13. a3 Qd7 14. Qc2 Bg6 15. Bd3 Rfc8 16. Rfb1 Bf8 17. h4 Ne7 18. g3 Qa4 19. Ne1 Qxc2 20. Bxc2 Bxc2 21. Nxc2 Na4 22. Rb3 b6 23. Kf1 c5 24. bxc5 bxc5 25. dxc5 Rxc5 26. Nb1 Rac8 27. Be3 Rc4 28. Bd4 Nc6 29. Rb5 Nxd4 30. Nxd4 Nxc3 31. Nxc3 Rxd4 32. Ne2 Ra4 33. Ke1 Rxa3 34. Rab1 Bb4+ 35. Kf1 Rd3 0-1',
        owner: 'mirotero',
      },
    ])
  }
}
