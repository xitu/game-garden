import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import 'base_widget.dart';
import 'pulse.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      body: SafeArea(
        child: Center(
          child: Column(
            children: [
              _topAction(context),
              lExpanded(),
              lExpanded(flex: 4),
              lText(
                'A',
                bold: true,
                size: 18,
                color: Colors.grey[600],
              ),
              lExpanded(),
              lText(
                'Work',
                bold: true,
                size: 36,
                color: Colors.black,
              ),
              lExpanded(),
              lText(
                'by',
                bold: true,
                size: 18,
                color: Colors.grey[600],
              ),
              lExpanded(),
              Image.asset(
                'assets/images/qr.jpg',
                width: 120,
              ),
              lExpanded(flex: 10, child: _homeSite()),
              _madeWithLove(),
              lExpanded(),
              _bottomAction(),
              lExpanded(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _homeSite() {
    const url = 'https://xbox.work';
    return GestureDetector(
      onTap: () async {
        if (await canLaunch(url)) {
          await launch(url);
        }
      },
      child: lText(
        url,
        color: Colors.blue,
      ),
    );
  }

  Widget _topAction(context) => Container(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            lIconButton(
              Icons.chevron_left,
              size: 32,
              color: Colors.black,
              onTap: () => Navigator.of(context).pop(),
            ),
            lExpanded(),
          ],
        ),
      );

  Widget _madeWithLove() => Row(
        children: [
          lExpanded(),
          lText(
            'Made with ',
            bold: true,
            size: 18,
            color: Colors.grey[600],
          ),
          const Pulse(
            child: Icon(
              Icons.favorite,
              size: 16,
              color: Colors.red,
            ),
          ),
          lExpanded(),
        ],
      );

  Widget _bottomAction() => Row(
        children: [
          lExpanded(),
          lText(
            'Powered by',
            bold: true,
            size: 18,
            color: Colors.grey[600],
          ),
          lWidth(16),
          const FlutterLogo(size: 24),
          const Icon(
            Icons.close,
            size: 16,
            color: Colors.black54,
          ),
          Image.asset(
            'assets/images/flame.png',
            width: 24,
          ),
          lExpanded(),
        ],
      );
}
