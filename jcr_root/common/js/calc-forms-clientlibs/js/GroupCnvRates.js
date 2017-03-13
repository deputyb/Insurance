// This function allows the code to access the array using the format "var MonthlyRate = RateArray[0].Monthly"
// which adds clearity to the code.
function RateValues(Monthly, Quarterly, SemiAnnual,Annual){
	this.Monthly = Monthly;
	this.Quarterly = Quarterly;
	this.SemiAnnual = SemiAnnual;
	this.Annual = Annual;
}
RateArray = new Array(95)
RateArray[0] = new RateValues(0.44,1.34,2.64,5.12)
RateArray[1] = new RateValues(0.43,1.32,2.6,5.04)
RateArray[2] = new RateValues(0.44,1.37,2.69,5.23)
RateArray[3] = new RateValues(0.46,1.43,2.80,5.43)
RateArray[4] = new RateValues(0.48,1.48,2.90,5.64)
RateArray[5] = new RateValues(0.5,1.54,3.01,5.85)
RateArray[6] = new RateValues(0.52,1.59,3.13,6.07)
RateArray[7] = new RateValues(0.54,1.65,3.24,6.30)
RateArray[8] = new RateValues(0.56,1.72,3.37,6.54)
RateArray[9] = new RateValues(0.58,1.79,3.5,6.8)
RateArray[10] = new RateValues(0.60,1.86,3.64,7.07)
RateArray[11] = new RateValues(0.62,1.93,3.78,7.34)
RateArray[12] = new RateValues(0.65,2,3.92,7.61)
RateArray[13] = new RateValues(0.67,2.07,4.06,7.88)
RateArray[14] = new RateValues(0.69,2.14,4.2,8.16)
RateArray[15] = new RateValues(0.72,2.22,4.35,8.45)
RateArray[16] = new RateValues(0.74,2.30,4.51,8.75)
RateArray[17] = new RateValues(0.77,2.37,4.66,9.04)
RateArray[18] = new RateValues(0.79,2.45,4.81,9.34)
RateArray[19] = new RateValues(0.82,2.53,4.96,9.64)
RateArray[20] = new RateValues(0.85,2.63,5.16,10.01)
RateArray[21] = new RateValues(0.88,2.71,5.32,10.33)
RateArray[22] = new RateValues(0.91,2.8,5.49,10.66)
RateArray[23] = new RateValues(0.94,2.89,5.68,11.02)
RateArray[24] = new RateValues(0.97,2.99,5.87,11.4)
RateArray[25] = new RateValues(1.0,3.09,6.07,11.79)
RateArray[26] = new RateValues(1.04,3.2,6.28,12.19)
RateArray[27] = new RateValues(1.07,3.31,6.49,12.6)
RateArray[28] = new RateValues(1.11,3.42,6.71,13.02)
RateArray[29] = new RateValues(1.14,3.53,6.93,13.46)
RateArray[30] = new RateValues(1.18,3.65,7.16,13.9)
RateArray[31] = new RateValues(1.22,3.77,7.4,14.37)
RateArray[32] = new RateValues(1.22,3.9,7.66,14.87)
RateArray[33] = new RateValues(1.31,4.04,7.93,15.4)
RateArray[34] = new RateValues(1.36,4.2,8.23,15.99)
RateArray[35] = new RateValues(1.41,4.36,8.56,16.62)
RateArray[36] = new RateValues(1.47,4.54,8.91,17.31)
RateArray[37] = new RateValues(1.54,4.74,9.31,18.07)
RateArray[38] = new RateValues(1.6,4.96,9.72,18.88)
RateArray[39] = new RateValues(1.68,5.18,10.17,19.75)
RateArray[40] = new RateValues(1.76,5.43,10.65,20.68)
RateArray[41] = new RateValues(1.84,5.69,11.15,21.66)
RateArray[42] = new RateValues(1.93,5.96,11.69,22.69)
RateArray[43] = new RateValues(2.02,6.24,12.24,23.77)
RateArray[44] = new RateValues(2.12,6.53,12.82,24.89)
RateArray[45] = new RateValues(2.22,6.84,13.42,26.06)
RateArray[46] = new RateValues(2.32,7.16,14.05,27.29)
RateArray[47] = new RateValues(2.43,7.5,14.71,28.57)
RateArray[48] = new RateValues(2.54,7.8,15.4,29.91)
RateArray[49] = new RateValues(2.66,8.22,16.12,31.31)
RateArray[50] = new RateValues(2.79,8.61,16.89,32.80)
RateArray[51] = new RateValues(2.92,9.02,17.70,34.36)
RateArray[52] = new RateValues(3.06,9.45,18.54,36)
RateArray[53] = new RateValues(3.21,9.91,19.44,37.74)
RateArray[54] = new RateValues(3.37,10.39,20.39,39.59)
RateArray[55] = new RateValues(3.53,10.9,21.39,41.54)
RateArray[56] = new RateValues(3.71,11.45,22.46,43.61)
RateArray[57] = new RateValues(3.89,12.03,23.59,45.81)
RateArray[58] = new RateValues(4.09,12.63,24.79,48.13)
RateArray[59] = new RateValues(4.3,13.28,26.05,50.59)
RateArray[60] = new RateValues(4.52,13.96,27.39,53.18)
RateArray[61] = new RateValues(4.75,14.68,28.81,55.94)
RateArray[62] = new RateValues(5,15.46,30.32,58.88)
RateArray[63] = new RateValues(5.27,16.27,31.92,61.98)
RateArray[64] = new RateValues(5.55,17.14,33.62,65.29)
RateArray[65] = new RateValues(5.85,18.06,35.43,68.80)
RateArray[66] = new RateValues(6.17,19.04,37.35,72.53)
RateArray[67] = new RateValues(6.5,20.07,39.38,76.47)
RateArray[68] = new RateValues(6.85,21.16,41.52,80.62)
RateArray[69] = new RateValues(7.23,22.32,43.78,85.01)
RateArray[70] = new RateValues(7.62,23.53,46.16,89.63)
RateArray[71] = new RateValues(8.03,24.8,48.65,94.46)
RateArray[72] = new RateValues(8.47,26.16, 51.32, 99.65)
RateArray[73] = new RateValues(8.94,27.62,54.18,105.21)
RateArray[74] = new RateValues(9.44,29.16, 57.2,111.07)
RateArray[75] = new RateValues(9.99,30.86,60.55,117.58)
RateArray[76] = new RateValues(10.58,32.68,64.11,124.49)
RateArray[77] = new RateValues(11.21,34.62,67.92,131.88)
RateArray[78] = new RateValues(11.88,36.69,71.98,139.76)
RateArray[79] = new RateValues(12.59,38.87,76.27,148.09)
RateArray[80] = new RateValues(13.33,41.18,80.79,156.88)
RateArray[81] = new RateValues(14.12,43.6,85.55,166.11)
RateArray[82] = new RateValues(14.94,46.15,90.54,175.81)
RateArray[83] = new RateValues(15.81,48.84,95.82,186.05)
RateArray[84] = new RateValues(16.74,51.69,101.41,196.91)
RateArray[85] = new RateValues(17.72,54.73,107.38,208.5)
RateArray[86] = new RateValues(18.78,58,113.8,220.97)
RateArray[87] = new RateValues(20.36,62.87,123.35,239.52)
RateArray[88] = new RateValues(21.2,65.48,128.47,249.46)
RateArray[89] = new RateValues(22.63,69.89,137.11,266.24)
RateArray[90] = new RateValues(24.26,74.92,146.98,285.4)
RateArray[91] = new RateValues(26.16,80.78,158.48,307.73)
RateArray[92] = new RateValues(28.42,87.78,172.22,334.4)
RateArray[93] = new RateValues(34.91,107.8,211.5,410.67)
RateArray[94] = new RateValues(40.07,123.75,242.79,471.44)