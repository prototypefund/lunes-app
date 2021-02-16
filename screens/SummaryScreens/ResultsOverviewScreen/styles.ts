import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.lunesWhite,
    height: '100%',
    alignItems: 'center',
    paddingBottom: hp('4%'),
  },
  list: {
    paddingHorizontal: 15,
    flexGrow: 0,
    width: wp('100%'),
    marginTop: hp('6%'),
    marginBottom: hp('6%'),
  },
  screenDescription: {
    fontSize: wp('4%'),
    color: COLORS.lunesGreyMedium,
    fontFamily: 'SourceSansPro-Regular',
  },
  description: {
    fontSize: wp('4%'),
    color: COLORS.lunesGreyDark,
    fontFamily: 'SourceSansPro-Regular',
  },
  screenTitle: {
    textAlign: 'center',
    fontSize: wp('5%'),
    color: COLORS.lunesGreyDark,
    fontFamily: 'SourceSansPro-SemiBold',
    paddingBottom: hp('4%'),
  },
  screenSubTitle: {
    textAlign: 'center',
    fontSize: wp('4%'),
    color: COLORS.lunesGreyDark,
    fontFamily: 'SourceSansPro-SemiBold',
  },
  container: {
    alignSelf: 'center',
    paddingVertical: 17,
    paddingRight: 16,
    paddingLeft: 25,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('85%'),
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderColor: COLORS.lunesBlackUltralight,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  clickedContainer: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: 17,
    paddingRight: 16,
    paddingLeft: 25,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('85%'),
    backgroundColor: COLORS.lunesBlack,
    borderColor: COLORS.white,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  clickedItemTitle: {
    textAlign: 'left',
    fontSize: wp('5%'),
    fontWeight: '600',
    letterSpacing: 0.11,
    marginBottom: 2,
    color: COLORS.lunesWhite,
    fontFamily: 'SourceSansPro-SemiBold',
  },
  clickedItemDescription: {
    fontSize: wp('4%'),
    fontWeight: 'normal',
    color: COLORS.white,
    fontFamily: 'SourceSansPro-Regular',
  },
  title2: {
    textAlign: 'left',
    fontSize: wp('4.5%'),
    fontWeight: '600',
    letterSpacing: 0.11,
    marginBottom: 2,
    color: COLORS.lunesGreyDark,
    fontFamily: 'SourceSansPro-SemiBold',
  },
  level: {
    marginTop: hp('1%'),
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  lightLabel: {
    fontSize: wp('3.5%'),
    fontFamily: 'SourceSansPro-Semibold',
    color: COLORS.lunesWhite,
    fontWeight: '600',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  headerLeft: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
  },
  headerText: {
    fontSize: wp('3.5%'),
    fontWeight: '600',
    fontFamily: 'SourceSansPro-Semibold',
    color: COLORS.lunesBlack,
    textTransform: 'uppercase',
    marginRight: 8,
  },
  rightHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
