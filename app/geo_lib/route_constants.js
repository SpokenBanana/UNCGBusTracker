/**
 * File holding markers of each route detailing how long it should take to get to the next stop at that location.
 *
 * NO I did not manually find this information out. I built a little web app to let me "draw" each bus route
 * so I was able to easily pin these marks and input this information. The tool would then spit out these arrays
 * which I then copied to this file.
 *
 * ...so I guess yeah it's a bit manual. And messy. But I didn't have any historical data to get more accurate ETA
 * estimation so this was the next best thing.
 */

module.exports = {
  ROUTE_MARKS: [
    /**
     * Idea is that the name of the stop is the key to the route stops array, so then we
     * can pass as a prop to the stopmarkers which marker to update the description with
     * something like "Bus incoming in x minutes".
     *
     * Later we can expand this to then go through each stop afterwards and update with
     * "Approx. (x + n) minutes until next bus" using a relaxing method to take the minimum
     * time.
     *
     * PROBLEM: Would be very CPU intensive, every two seconds we're going through each routemark,
     * then each stopmark for every bus. This must be benchmarked in some way.
     */

    [36.064376, -79.807101, 'Glenwood Street', 3, 'Campus Loop'],

    [36.06404733159068, -79.81276094913477, 'Kenilworth Street', 1, 'Campus Loop'],

    [36.06250790235439, -79.81391966342926, 'Lot 1', 1, 'Campus Loop'],

    [36.06305429477092, -79.80817973613739, 'Spartan Villiage', 1, 'Campus Loop'],
    [36.0624732106443, -79.80816900730133, 'Spartan Villiage', 1, 'Campus Loop'],

    [36.06269003358151, -79.80724096298212, 'Kaplan Wellness Center', 2, 'Campus Loop'],
    [36.0628542765587, -79.8111891746521, 'Kaplan Wellness Center', 1, 'Campus Loop'],

    [36.06516123079371, -79.81268048286438, 'Spring Garden Apps', 1, 'Campus Loop'],

    [36.06596778154028, -79.81449365615839, 'Lot 9 at Stadium', 1, 'Campus Loop'],

    [36.06762971083223, -79.81455374603274, 'Walker Ave Circle', 2, 'Campus Loop'],
    [36.06826187368755, -79.81406585152052, 'Walker Ave Circle', 2, 'Campus Loop'],
    [36.06826641153839, -79.81346030919264, 'Walker Ave Circle', 1, 'Campus Loop'],
    [36.068283445228396, -79.81285124173354, 'Walker Ave Circle', 1, 'Campus Loop'],
    [36.068245268692145, -79.8121947202377, 'Walker Ave Circle', 1, 'Campus Loop'],
    [36.068202755995266, -79.81165095337309, 'Walker Ave Circle', 1, 'Campus Loop'],
    [36.0681650920827, -79.81108131779104, 'Walker Ave Circle', 1, 'Campus Loop'],
    [36.06821596623899, -79.81075331779095, 'Walker Ave Circle', 1, 'Campus Loop'],

    [36.06837599999999, -79.81091544047547, 'Moore-Strong', 3, 'Campus Loop'],
    [36.06841868910376, -79.81136228836061, 'Moore-Strong', 3, 'Campus Loop'],
    [36.06842734454805, -79.8119464576721, 'Moore-Strong', 3, 'Campus Loop'],
    [36.06850421007931, -79.81250228836052, 'Moore-Strong', 3, 'Campus Loop'],
    [36.06850400839805, -79.81318998280335, 'Moore-Strong', 3, 'Campus Loop'],
    [36.06853969089189, -79.81373727321619, 'Moore-Strong', 3, 'Campus Loop'],
    [36.0706410599899, -79.81498718261713, 'Moore-Strong', 2, 'Campus Loop'],
    [36.06852912157345, -79.814233481884, 'Moore-Strong', 3, 'Campus Loop'],
    [36.073607, -79.812873, 'Moore-Strong', 2, 'Campus Loop'],
    [36.07302, -79.811149, 'Moore-Strong', 1, 'Campus Loop'],

    [36.071995, -79.810422, 'West Drive', 1, 'Campus Loop'],

    [36.070479, -79.810422, 'Fountain', 1, 'Campus Loop'],

    [36.06978260669768, -79.80979966137693, 'College Ave', 1, 'Campus Loop'],
    [36.070187117602636, -79.80900383068854, 'College Ave', 1, 'Campus Loop'],

    [36.070557048383165, -79.80768312764741, 'Sullivan Science', 1, 'Campus Loop'],

    [36.07078068003704, -79.80672508465585, '119 McIver Street', 1, 'Campus Loop'],
    [36.071409, -79.806693, '119 McIver Street', 1, 'Campus Loop'],

    [36.072849, -79.806618, 'Tate Street', 3, 'Campus Loop'],
    [36.073326, -79.80679, 'Tate Street', 3, 'Campus Loop'],
    [36.073308, -79.805653, 'Tate Street', 2, 'Campus Loop'],
    [36.072615, -79.805342, 'Tate Street', 2, 'Campus Loop'],
    [36.07174326059202, -79.80542689814763, 'Tate Street', 2, 'Campus Loop'],
    [36.070828192921134, -79.8055133558197, 'Tate Street', 2, 'Campus Loop'],
    [36.069918, -79.805567, 'Tate Street', 1, 'Campus Loop'],
    [36.068201, -79.80561, 'Tate Street', 1, 'Campus Loop'],

    [36.066926, -79.805567, 'Lot 7 at Gatewood', 1, 'Campus Loop'],
    [36.065859, -79.805384, 'Lot 7 at Gatewood', 1, 'Campus Loop'],
    [36.065642, -79.8062, 'Lot 7 at Gatewood', 1, 'Campus Loop'],

  ],
  SV_ROUTE_MARKS: [
    [36.06509076561798, -79.81365680694574, 'Glenwood Street', 4, 'Spartan Village'],
    [36.063876586523214, -79.81535196304321, 'Glenwood Street', 3, 'Spartan Village'],
    [36.062436892743875, -79.81492280960083, 'Glenwood Street', 2, 'Spartan Village'],
    [36.062645042871154, -79.81314182281488, 'Glenwood Street', 2, 'Spartan Village'],
    [36.06280115510525, -79.81234788894648, 'Glenwood Street', 2, 'Spartan Village'],
    [36.06126603801754, -79.81147885322565, 'Kaplan Wellness Center', 1, 'Spartan Village'],
    [36.06212195621795, -79.81160759925837, 'Spartan Villiage', 2, 'Spartan Village'],
    [36.06292420168262, -79.80981588363642, 'Spartan Villiage', 1, 'Spartan Village'],
    [36.06318872406954, -79.80845868587488, 'Spartan Villiage', 1, 'Spartan Village'],
    [36.06275941679522, -79.80819046497345, 'Spartan Villiage', 1, 'Spartan Village'],
    [36.06275074389686, -79.80719804763788, 'Lot 7 at Gatewood', 4, 'Spartan Village'],
    [36.06331393824998, -79.80691909790039, 'Lot 7 at Gatewood', 3, 'Spartan Village'],
    [36.063565450114126, -79.80515956878662, 'Lot 7 at Gatewood', 2, 'Spartan Village'],
    [36.064788306685315, -79.80520248413086, 'Lot 7 at Gatewood', 1, 'Spartan Village'],
    [36.065109194977744, -79.8072624206543, 'Walker Ave Circle', 4, 'Spartan Village'],
    [36.06412918068211, -79.80784177780146, 'Walker Ave Circle', 4, 'Spartan Village'],
    [36.06388634339423, -79.80952620506281, 'Walker Ave Circle', 4, 'Spartan Village'],
    [36.065693511851386, -79.81072783470148, 'Walker Ave Circle', 2, 'Spartan Village'],
    [36.06662580808069, -79.81132328510279, 'Walker Ave Circle', 1, 'Spartan Village'],
    [36.067854579314506, -79.81132864952082, 'Walker Ave Circle', 1, 'Spartan Village'],
    [36.06450102382664, -79.8101377487182, 'Walker Ave Circle', 3, 'Spartan Village'],
    [36.06818846355015, -79.81103897094721, 'Walker Ave Circle', 0, 'Spartan Village'],
    [36.06847031277582, -79.81133937835688, 'Visitor\'s Center', 3, 'Spartan Village'],
    [36.068444295966515, -79.81236398220062, 'Visitor\'s Center', 3, 'Spartan Village'],
    [36.06804970663731, -79.81265366077417, 'Visitor\'s Center', 2, 'Spartan Village'],
    [36.067130435907785, -79.81258928775787, 'Visitor\'s Center', 2, 'Spartan Village'],
    [36.065534153134394, -79.81269121170044, 'Visitor\'s Center', 1, 'Spartan Village'],
  ]
};
